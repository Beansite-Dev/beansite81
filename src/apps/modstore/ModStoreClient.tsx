import React, { Suspense, useCallback, useEffect, useRef, useState, type ReactElement } from "react";
import { motion } from "motion/react";
import { useLiveQuery } from "dexie-react-hooks";
import { defaultModstore, derivedModStoreWinAtom, modstoredb, modstoreSchema, modStoreWinAtom, type IModstore, type Ioptions } from "./modstore";
import "./style.scss";
import { atom, useAtom } from "jotai";
import { Dialog } from "@base-ui/react";
import { createPortal } from "react-dom";
import Markdown from 'react-markdown';
import { Icon } from "../../sdk/components/Enum";
import { transform } from "sucrase";
// import { DynamicComponentRenderer } from "./ModComponent";
const runStatusAtom=atom<{[key:string]:boolean}>({});
const configOpenAtom=atom<[string,boolean]>(["",false]);
const uAtom=atom<[string,boolean]>(["",false]);
const ModStoreClient=({contentRef,rndRef}:any):ReactElement=>{
  const mods=useLiveQuery(()=>modstoredb.mods.toArray());
  const f=(x:string)=>x.toLowerCase().trim();
  //?manual code db reset
  useEffect(()=>{
    const currentUrl=new URL(window.location.href);
    if(currentUrl.searchParams.has("resetMods"))(async()=>{
      await modstoredb.delete();
      currentUrl.searchParams.delete("resetMods");
      window.history.replaceState({},"",currentUrl.toString());
      location.reload();
    })()
  },[]);
  const[search,setSearch]=useState<string>("");
  const Mod=({mod}:{mod:IModstore}):ReactElement=>{
    const[working,setWorking]=useState<boolean>(false);
    const[error,setError]=useState<Error|null>(null);
    const[runStatus,setRunStatus]=useAtom(runStatusAtom);
    const[configOpen,setConfigOpen]=useAtom(configOpenAtom);
    useEffect(()=>{try{
      console.warn(contentRef);
      modstoreSchema.parse(mod);
      console.warn(mod,"schema passed");
      setWorking(true);
    }catch(e){console.error(e);}},[]);
    const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
    const runStringAsPromise=(codeString:string,args:Record<string,any>={})=>
      new AsyncFunction(...Object.keys(args),codeString)(...Object.values(args))
    const runScripts=useCallback(()=>{
      if(runStatus[mod.id]||!mod.scripts)return;
      if(!mod.scripts.preload){runStringAsPromise(mod.scripts.main as string);return;}
      runStringAsPromise(mod.scripts.preload,{mod})//@ts-ignore
        .then(()=>{console.warn("Completed preload");return runStringAsPromise(mod.scripts.main);})
        .then(()=>{setRunStatus(x=>({...x,[mod.id]:true}));})
        .catch((err:Error)=>console.error(`Mod "${mod.id}" failed:`,err));
    },[]);
    useEffect(()=>{try{
      if(!working||!mod.enabled||!mod.scripts)return;
      console.warn(mod,"enabled, running functions");
      runScripts();
    }catch(e){setError(e as Error)}},[working,mod]);
    const[u,sU]=useAtom(uAtom);
    const[,setWin]=useAtom(derivedModStoreWinAtom);
    const Option=({option}:{option:Ioptions}):ReactElement=>{
      const SelectType=():ReactElement=>{const r=useRef<any>(null);const upd=async(e:any,typeOfValue="value")=>{
        sU([mod.id,true]);
        let val=e.currentTarget[typeOfValue];
        await modstoredb.mods.update(
          mod.id,//@ts-ignore
          {[`options.${mod.options?.indexOf(option)}.value`]:val}
        ).then((newmod)=>{if(newmod){
          console.warn("Updated mod: ",newmod);
          setTimeout(()=>{
            sU([mod.id,false]);
            runStringAsPromise(mod.scripts?.onchange as string,{newmod:mod,newval:val});
            runStringAsPromise(option.onchange as string,{newmod:mod,newval:val});
          },1500);
        }});
      };switch(option.type){
        case "color":return<motion.input
          ref={r}
          type="color"
          className="msccolorinput"
          onBlur={async(e)=>{upd(e);}}
          defaultValue={(option.value) as string}/>
        case "select":return<motion.select
          ref={r}
          className="mscinput config"
          onChange={async(e)=>{upd(e);}}
          defaultValue={(option.value) as string}>
            {option.selectOptions?.map((x,i)=>
              <motion.option key={i} value={x}>{x}</motion.option>)}
        </motion.select>
        case "number":return<motion.input
          defaultValue={(option.value)as number}
          type="number"
          ref={r}
          onBlur={async(e)=>{upd(e);}}
          className="mscinput config"
          onKeyDown={async(e)=>{if(e.key=="Enter"){upd(e);}}}/>
        case "boolean":return<motion.input
          defaultChecked={(option.value)as boolean}
          type="checkbox"
          ref={r}
          onChange={async(e)=>{upd(e,"checked");}}/>
        case"text":return<motion.input
          defaultValue={(option.value)as string}
          type="text"
          onBlur={async(e)=>{upd(e);}}
          ref={r}
          onKeyDown={async(e)=>{if(e.key=="Enter"){upd(e);}}}
          className="mscinput config"/>;
        default:return<>Option type error</>;
      }};
      return(<>
        <motion.div className="mscrowWrapper config">
          <motion.p>
            {option.name}<br/>
            <motion.span style={{opacity:".5",fontSize:".55rem"}}>{option.description}</motion.span>
          </motion.p><motion.span className="spacer"></motion.span>
          <SelectType/>
        </motion.div>
      </>);
    };
    const optionsFileRef=useRef<HTMLInputElement>(null);
    const exportOptions=()=>{
      if(!mod.options)return;
      let data=JSON.stringify({id:mod.id,options:mod.options.map(o=>({name:o.name,value:o.value}))},null,2);
      let blob=new Blob([data],{type:"application/json"});
      let url=URL.createObjectURL(blob);
      let a=document.createElement("a");
      a.href=url;a.download=`${mod.id}-options.json`;a.click();
      URL.revokeObjectURL(url);
    };
    const importOptions=async(file:File)=>{try{
      let parsed=JSON.parse(await file.text())as{id?:string,options:{name:string,value:any}[]};
      if(parsed.id&&parsed.id!==mod.id&&!confirm(`This export was for mod "${parsed.id}", apply to "${mod.id}" anyway?`))return;
      sU([mod.id,true]);
      let changed:{option:Ioptions,value:any}[]=[];
      let updated=mod.options?.map(o=>{
        let match=parsed.options.find(p=>p.name===o.name);
        if(match&&match.value!==o.value)changed.push({option:o,value:match.value});
        return match?{...o,value:match.value}:o;
      });
      await modstoredb.mods.update(mod.id,{options:updated})
        .then((newmod)=>{if(newmod){
          console.warn("Imported options: ",newmod);
          setTimeout(()=>{
            sU([mod.id,false]);
            runStringAsPromise(mod.scripts?.onchange as string,{newmod:mod,newval:changed});
            changed.forEach(({option,value})=>
              runStringAsPromise(option.onchange as string,{newmod:mod,newval:value}));
          },1500);
        }});
    }catch(e){sU(["",false]);alert("error: "+e)}};
    return(<><motion.div className="mod">
      {(!!mod.customCSS&&mod.enabled)?createPortal(<style>{mod.customCSS}</style>,document.head):null}
      <motion.h1>{mod.name}&nbsp;</motion.h1>
      <motion.div className="mscrowWrapper">
        <motion.span className="code">{mod.id}</motion.span>by <a href={`mailto:${mod.author}`}>{mod.authorNick||mod.author}</a>
        |<a href={mod.source}>Source Code</a>
      </motion.div>
      {mod.tags&&<motion.div className="mscrowWrapper"><motion.span>Tags:</motion.span>
        {mod.tags?.map((x,i)=><motion.div key={i} className="tag">{x}</motion.div>)}
        <motion.div className={`tag ${working}`}>{working?"Working":"Non-Working"}</motion.div>
      </motion.div>}
      <motion.div className="description">
        <Markdown>{mod.description||"This mod has no desription"}</Markdown>
      </motion.div>
      <motion.div className="mscrowWrapper ButtonWrapper">
        <motion.button 
          onClick={async(e)=>{
            e.preventDefault();
            setRunStatus(x=>({...x,[mod.id]:false}));
            await modstoredb.mods.update(mod.id,{enabled:!mod.enabled})
              .then((newmod)=>console.warn("Updated mod: ",newmod));
          }}
          style={working?{}:{opacity:".5",pointerEvents:"none",}}
          className={`enabledbtn ${mod.enabled}`}>Enable{mod.enabled?"d":""}</motion.button>
        {(mod.enabled&&mod.options)?<Dialog.Root open={configOpen[0]==mod.id&&configOpen[1]}>
          <Dialog.Trigger 
            onClick={(e)=>setConfigOpen([mod.id,true])}
            className={`enabledbtn`}
            style={working?{}:{opacity:".5",pointerEvents:"none",}}>Configure</Dialog.Trigger>
          <Dialog.Portal container={contentRef}>
            <Dialog.Backdrop className="modconfigbackdrop" onClick={()=>setConfigOpen(["",false])} />
            <Dialog.Popup 
              style={(u[0]===mod.id&&u[1])?{
                pointerEvents:"none",
                animation:"1.5s flashMod infinite",
              }:{}}
              className="modconfigpopup">
                <motion.h1 style={{fontSize:"1.25rem"}}>{mod.name} - Configuration</motion.h1>
                {/* @ts-ignore */}
                {mod.options?.map((option:Ioptions,key:number)=>
                  (<Option option={option} key={key}/>))}
                {createPortal(<input
                  type="file"
                  ref={optionsFileRef}
                  accept=".json"
                  style={{display:"none"}}
                  onChange={(e)=>{
                    let file=e.target.files?.[0];
                    if(file)importOptions(file);
                    optionsFileRef.current!.value="";
                  }}/>,document.body)}
                <motion.div className="mscrowWrapper ButtonWrapper">
                  <Dialog.Close 
                    onClick={()=>setConfigOpen(["",false])}
                    className="enabledbtn">Close</Dialog.Close>
                  <motion.button className="enabledbtn" onClick={exportOptions}>Export Options</motion.button>
                  <motion.button className="enabledbtn" style={{marginTop:".25rem"}} onClick={()=>optionsFileRef.current!.click()}>Import Options</motion.button>
                </motion.div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>:null}
      </motion.div>
    </motion.div></>);
  };
  const fileUploadRef=useRef<HTMLInputElement>(null);
  return(<><motion.div className="mscscrollWrapper">
    <motion.h1 style={{marginBottom:".75rem"}}>Mod Store</motion.h1>
    <motion.div className="mscrowWrapper">
      <motion.input 
        style={{marginBottom:".75rem"}}
        defaultValue={search}
        onKeyDown={(e)=>{if(e.key=="Enter")setSearch(e.currentTarget.value)}}
        type="text" 
        placeholder="Search" 
        id="modstoresearch"/>
      {createPortal(<input
        type="file"
        ref={fileUploadRef}
        accept=".json,.js,.ts"
        onChange={(e)=>{
          const file=e.target.files![0];
          if(!file)return;
          const reader=new FileReader();
          reader.readAsText(file,'UTF-8');
          reader.onload=function({target}){
            let contents=target?.result;
            let ext=file.name.slice(file.name.lastIndexOf(".")+1).toLowerCase();
            switch(ext){
              case "json":try{
                let parsed=JSON.parse(contents as string)
                let res=modstoreSchema.safeParse(parsed);
                if(res.success)modstoredb.mods.add(parsed);
                else alert("error: "+JSON.stringify(res.error));
              }catch(e){alert("error: "+e)}break;
              case "js":try{
                let module={exports:{}};
                new Function("module","exports",contents as string)(module,module.exports);
                let parsed=module.exports;
                let res=modstoreSchema.safeParse(parsed);
                if(res.success)modstoredb.mods.add(parsed as IModstore);
                else alert("error: "+JSON.stringify(res.error));
              }catch(e){alert("error: "+e)}break;
              case "ts":try{
                let{code}=transform(contents as string,{transforms:["typescript"]});
                let module={exports:{}};
                new Function("module","exports",code)(module,module.exports);
                let parsed=module.exports;
                let res=modstoreSchema.safeParse(parsed);
                if(res.success)modstoredb.mods.add(parsed as IModstore);
                else alert("error: "+JSON.stringify(res.error));
              }catch(e){alert("error: "+e)}break;
              default:alert("File upload failed, invalid type: "+ext);
            }
            fileUploadRef.current!.value="";
          }
          reader.onerror=()=>{
            alert('error reading file');
            fileUploadRef.current!.value="";
          };
        }}
        style={{display:'none'}}/>,document.body)}
      <motion.button 
        onClick={(e)=>{if(confirm("Bad actors may try to embed malware into mods. Do understand this? Have you verified that your mod is safe?"))fileUploadRef.current!.click()}}
        className="mscAdd"
        style={{marginBottom:".75rem"}}>
          <Icon icon="plus" elmtype="span" className="icon"/> Add
      </motion.button>
      <Dialog.Root>
        <Dialog.Trigger
          className="mscAdd"
          style={{marginBottom:".75rem"}}>
            <Icon icon="help" elmtype="span" className="icon"/>Help</Dialog.Trigger>
        <Dialog.Portal container={contentRef}>
          <Dialog.Backdrop className="modconfigbackdrop"/>
          <Dialog.Popup className="modconfigpopup">
            <motion.h1>How to Create</motion.h1>
            <motion.p style={{fontSize:".75rem",marginBottom:".75rem"}}>
              In order to create a mod, you should have a pretty good understanding of
              javascript, typescript, and/or using json files. You may navigate to 
              our <a href={"https://github.com/Beansite-Dev/beansite81/tree/main/src/app/modstore/mods/tests/"}>mod examples</a>
              &nbsp;to get an understanding of how you may write a mod. Documentation will be available 
              from our homepage.
            </motion.p>
            <motion.div className="mscrowWrapper ButtonWrapper">
              <Dialog.Close className="enabledbtn">Close</Dialog.Close>
            </motion.div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </motion.div>
    {/* <motion.h3 style={{marginBottom:".75rem"}}>Installed</motion.h3> */}
    <motion.div className="modWrapper"><Suspense fallback={<>
      <motion.h1 className="mscloading">Loading...</motion.h1>
    </>}>
      {mods?mods
      .filter(x=>
        f(x.name).includes(f(search))
        ||f(x.id).includes(f(search))
        ||f(JSON.stringify(x.tags)).includes(f(search))
        ||f(x.author).includes(f(search)))
      .map((x,i)=><Mod key={i} mod={x}/>):null}
    </Suspense>
    </motion.div>
  </motion.div></>);
};
export default ModStoreClient;