import "./styles/Settings.scss";
import type { ReactElement } from "react";
import { useEffect, useRef } from "react";
import { atom, useAtom } from "jotai";
import { isMotionComponent, motion, AnimatePresence } from "motion/react";
import { DerivedSetttingsAtom } from "../store";
import{ useDropzone } from "react-dropzone";
const Settings=({}):ReactElement=>{
  const[settings,setSettings]=useAtom(DerivedSetttingsAtom);
  useEffect(()=>{
    localStorage.setItem("mb81-settings",JSON.stringify(settings));
    console.table(settings);
  },[settings]);
  const DragAndDrop=({}):ReactElement=>{
    const{acceptedFiles,getRootProps,getInputProps}=useDropzone({
      onDrop:(files:any):void=>{
        console.log(files[0]);
        const x=new FileReader();
        x.onload=(e)=>{
          const result=e.target?.result;
          if(typeof result==="string"){setSettings(["backgroundImage",result]);}
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
  return(<>
    <motion.div id="Settings">
      <h1>Settings</h1>
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
        <DragAndDrop/>
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