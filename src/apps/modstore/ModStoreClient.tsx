import React, { Suspense, useCallback, useEffect, useRef, useState, type ReactElement } from "react";
import { motion } from "motion/react";
import { useLiveQuery } from "dexie-react-hooks";
import { defaultModstore, modstoredb, modstoreSchema, type IModstore, type Ioptions } from "./modstore";
import "./style.scss";
import { atom, useAtom } from "jotai";
import { Dialog } from "@base-ui/react";
import { createPortal } from "react-dom";
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
          className="mscinput config"
          onKeyDown={async(e)=>{if(e.key=="Enter"){upd(e);}}}/>
        case "boolean":return<motion.input
          defaultChecked={(option.value)as boolean}
          type="checkbox"
          ref={r}
          onChange={async(e)=>{upd(e,"checked");}}/>
        case"text":return<motion.input
          defaultValue={(option.value)as string}
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
          </motion.p>
          <SelectType/>
        </motion.div>
      </>);
    };
    return(<><motion.div className="mod">
      {(!!mod.customCSS&&mod.enabled)?createPortal(<style>{mod.customCSS}</style>,document.head):null}
      <motion.h1>{mod.name}&nbsp;</motion.h1>
      <motion.div className="mscrowWrapper">
        <motion.span className="code">{mod.id}</motion.span>by {mod.authorNick||mod.author}
        &nbsp;&nbsp;&nbsp;|&nbsp;
        <motion.span className={`tag ${working}`}>{working?"Working":"Non-Working"}</motion.span>
      </motion.div>
      {mod.tags&&<motion.div className="mscrowWrapper"><motion.span>Tags:</motion.span>
        {mod.tags?.map((x,i)=><motion.div key={i} className="tag">{x}</motion.div>)}
      </motion.div>}
      <motion.p className="description">{mod.description||"This mod has no desription"}</motion.p>
      <motion.div className="mscrowWrapper">
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
            <Dialog.Backdrop className="modconfigbackdrop" />
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
                <motion.div className="mscrowWrapper">
                  <Dialog.Close 
                    onClick={()=>setConfigOpen(["",false])}
                    className="enabledbtn">Close</Dialog.Close>
                </motion.div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>:null}
      </motion.div>
    </motion.div></>);
  };
  return(<><motion.div className="mscscrollWrapper">
    <motion.h1 style={{marginBottom:".75rem"}}>Mod Store</motion.h1>
    <motion.input 
      style={{marginBottom:".75rem"}}
      defaultValue={search}
      onKeyDown={(e)=>{if(e.key=="Enter")setSearch(e.currentTarget.value)}}
      type="text" 
      placeholder="Search" 
      id="modstoresearch"/><br/>
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