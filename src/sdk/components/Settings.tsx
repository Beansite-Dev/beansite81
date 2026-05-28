import "./styles/Settings.scss";
import type { ReactElement } from "react";
import { Suspense, useEffect, useRef, useState } from "react";
import { atom, useAtom } from "jotai";
import { isMotionComponent, motion, AnimatePresence } from "motion/react";
import { DerivedSetttingsAtom } from "../store";
import{ useDropzone } from "react-dropzone";
import { defaultBackgrounds, sbgdb, type IsavedBackgrounds } from "./store/savedbg.db";
import { generateId } from "../Lib";
import { useLiveQuery } from "dexie-react-hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const Settings=({}):ReactElement=>{
  const[settings,setSettings]=useAtom(DerivedSetttingsAtom);
  useEffect(()=>{
    localStorage.setItem("mb81-settings",JSON.stringify(settings));
    console.table(settings);
    document.body.style.zoom=`${settings.scale}%`;
  },[settings]);
  const DragAndDrop=({}):ReactElement=>{
    const{acceptedFiles,getRootProps,getInputProps}=useDropzone({
      onDrop:(files:any):void=>{
        console.log(files[0]);
        const x=new FileReader();
        x.onload=async(e)=>{
          const result=e.target?.result;
          try{
            let res:IsavedBackgrounds={
              id:generateId(10),
              name:files[0].name,
              src:files[0],
            };
            console.log(res);
            setSettings(["backgroundImage",result])
            await sbgdb.saved.put(res);
          }catch(e){};
        }
        x.readAsDataURL(files[0]);
      },
      accept:{'image/*':['.jpeg','.png']},
      maxFiles:1,
    });
    return(<>
      <motion.div {...getRootProps({className:"dropzone"})} id="dragAndDrop">
        <input {...getInputProps()} />
        <motion.p>Drop some files here, or click to select files</motion.p>
      </motion.div>
    </>);
  }
  const SavedBackgrounds=({}):ReactElement=>{
    const savedBackgrounds=useLiveQuery(()=>sbgdb.saved.toArray());
    useEffect(()=>{
      console.warn(savedBackgrounds);
    },[savedBackgrounds]);
    const SavedBackground=({x}:{x:IsavedBackgrounds}):ReactElement=>{
      const[deleting,setDeleting]=useState<boolean>(false);
      return(<motion.div onClick={()=>{
        setSettings(["backgroundImage",x.src instanceof Blob?URL.createObjectURL(x.src):x.src]);
      }} key={x.id} className="savedBg">
        {deleting?<motion.div className="deleting">Deleting...</motion.div>:null}
        <motion.div className="bg" style={{
          backgroundImage:`url("${x.src instanceof Blob?URL.createObjectURL(x.src):x.src}")`,
        }}></motion.div>
        <motion.button className="trashButton" onClick={()=>{
          setDeleting(true);
          sbgdb.transaction('rw',sbgdb.saved,function*(){
            sbgdb.saved.filter(i=>i.id==x.id).toArray().then(z=>console.log(z));
            yield sbgdb.saved.filter(i=>i.id==x.id).delete();
            sbgdb.saved.toArray().then(z=>console.log(z));
          }).catch(e=>{console.error(e);});
        }}><FontAwesomeIcon icon={faTrash}/></motion.button>
      </motion.div>);
    }
    return(<><Suspense fallback={<motion.h1>Loading Saved Backgrounds...</motion.h1>}>
      <motion.div className="backgroundSelector">
        {savedBackgrounds
          ?[...defaultBackgrounds,...savedBackgrounds]!
            .map((x:IsavedBackgrounds)=><SavedBackground key={x.id} x={x}/>)
          :<motion.h2>Loading...</motion.h2>}
      </motion.div>
    </Suspense></>);
  };
  return(<>
    <motion.div id="Settings">
      <h1>Settings</h1>
      {/* <motion.div id="general">
        <motion.h2>General</motion.h2>
        <motion.p>App scaling</motion.p>
        <motion.input 
          type="range"
          onChange={(e)=>{
            setSettings(["scale",e.target.value]);
          }}
          min={50} 
          max={200}
          defaultValue={settings.scale}
          name="Scale"
          id="scaleSelector"/>
      </motion.div> */}
      <motion.div id="font">
        <motion.h2>Font</motion.h2>
        <motion.p>Select a font: </motion.p>
        <select 
          onChange={(e)=>{setSettings(["font",e.target.value]);}}
          name="Font" 
          id="fontSelector" 
          defaultValue={settings.font}>
            <option value="segoe">Segoe UI</option>
            <option value="tahoma">Tahoma</option>
            <option value="comic">Comic Sans</option>
            <option value="time">Times New Roman</option>
            <option value="mono">Source Code Pro</option>
        </select>
      </motion.div><br/>
      <motion.div id="theme">
        <motion.h2>Theme</motion.h2>
        <motion.p>Select a theme: </motion.p>
        <select 
          onChange={(e)=>{
            setSettings(["theme",e.target.value]);
          }}
          name="Theme" 
          id="themeSelector" 
          defaultValue={settings.theme}>
            <option value="default">Default</option>
            <option value="dark">Dark</option>
            <option value="blue">Blue</option>
            {/*//?exclusive for testing
               // <option value="lib">DefaultLib</option> */}
        </select>
      </motion.div><br/>
      <motion.div id="background">
        <motion.h2>Background</motion.h2>
        <motion.h3>Upload a background</motion.h3>
        <DragAndDrop/>
        <motion.h3>Saved background</motion.h3>
        <p>Saved backgrounds may take a moment to delete</p>
        <SavedBackgrounds/>
      </motion.div>
      <motion.div id="dangerzone">
        <motion.h2>Danger Zone</motion.h2>
        <motion.button onClick={()=>{
          if(confirm("Would you really like to reset all settings?")){
            localStorage.clear();
            window.location.reload();
          }
        }}>Reset Settings</motion.button>
      </motion.div>
    </motion.div>
  </>);
}
export default Settings;