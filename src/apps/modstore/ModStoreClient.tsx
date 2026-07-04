import { Suspense, useCallback, useEffect, useRef, useState, type ReactElement } from "react";
import { motion } from "motion/react";
import { useLiveQuery } from "dexie-react-hooks";
import { defaultModstore, modstoredb, modstoreSchema, type IModstore } from "./modstore";
import "./style.scss";
import { atom, useAtom } from "jotai";
const runStatusAtom=atom<{[key:string]:boolean}>({});
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
    useEffect(()=>{try{
      modstoreSchema.parse(mod);
      console.warn(mod,"schema passed");
      setWorking(true);
    }catch(e){console.error(e);}},[]);
    const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
    const runStringAsPromise=(codeString:string,args:Record<string,any>={})=>
      new AsyncFunction(...Object.keys(args),codeString)(...Object.values(args))
    const runScripts=useCallback(()=>{
      if(runStatus[mod.id]||!mod.scripts)return;
      if(!mod.scripts.preload){runStringAsPromise(mod.scripts.main);return;}
      runStringAsPromise(mod.scripts.preload)//@ts-ignore
        .then(()=>{console.warn("Completed preload");return runStringAsPromise(mod.scripts.main);})
        .then(()=>{setRunStatus(x=>({...x,[mod.id]:true}));})
        .catch((err:Error)=>console.error(`Mod "${mod.id}" failed:`,err));
    },[]);
    useEffect(()=>{try{
      if(!working||!mod.enabled||!mod.scripts)return;
      console.warn(mod,"enabled, running functions");
      runScripts();
    }catch(e){setError(e as Error)}},[working,mod]);
    return(<><motion.div className="mod">
      <motion.h1>{mod.name}&nbsp;</motion.h1>
      <motion.div className="rowWrapper">
        <motion.span className="code">{mod.id}</motion.span>by {mod.authorNick||mod.author}
        &nbsp;&nbsp;&nbsp;|&nbsp;
        <motion.span className={`tag ${working}`}>{working?"Working":"Non-Working"}</motion.span>
      </motion.div>
      {mod.tags&&<motion.div className="rowWrapper"><motion.span>Tags:</motion.span>
        {mod.tags?.map((x,i)=><motion.div key={i} className="tag">{x}</motion.div>)}
      </motion.div>}
      <motion.p className="description">{mod.description||"This mod has no desription"}</motion.p>
      <motion.div className="rowWrapper">
        <motion.button 
          onClick={async(e)=>{
            e.preventDefault();
            setRunStatus(x=>({...x,[mod.id]:false}));
            await modstoredb.mods.update(mod.id,{enabled:!mod.enabled})
              .then((newmod)=>console.warn("Updated mod: ",newmod));
          }}
          style={working?{}:{opacity:".5",pointerEvents:"none",}}
          className={`enabledbtn ${mod.enabled}`}>Enable{mod.enabled?"d":""}</motion.button>
        {/* 
        
        //? TODO
        // make this button open a base ui popup
        
        */}
        {(mod.enabled&&mod.options)?<motion.button 
          onClick={async(e)=>{
            e.preventDefault();

          }}
          style={working?{}:{opacity:".5",pointerEvents:"none",}}
          className={`enabledbtn`}>Configure</motion.button>:null}
      </motion.div>
    </motion.div></>);
  };
  return(<>
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
  </>);
};
export default ModStoreClient;