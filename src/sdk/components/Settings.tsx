import "./styles/Settings.scss";
import type { ReactElement } from "react";
import { Suspense, useEffect, useRef, useState } from "react";
import { atom, useAtom } from "jotai";
import { isMotionComponent, motion, AnimatePresence } from "motion/react";
import { DerivedSettingsAtom, ExpressDerivedWinModifierAtom, SettingsAtom, SettingsAtomSchema, validAppKeys, type ISettingsAtom } from "../store";
import{ useDropzone } from "react-dropzone";
import { defaultBackgrounds, sbgdb, type IsavedBackgrounds } from "./store/savedbg.db";
import { generateId } from "../Lib";
import { useLiveQuery } from "dexie-react-hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import z from "zod";
//@ts-expect-error
import * as csstree from 'csstree-validator';
import postcss from "postcss";
import postcssNesting from "postcss-nesting";
import { createPortal } from "react-dom";
type AppKey=typeof validAppKeys[number];
const Settings=({}):ReactElement=>{
  const[settings,setSettings]=useAtom(DerivedSettingsAtom);
  const[,setSettingsDirect]=useAtom(SettingsAtom);
  const[,setWindow]=useAtom(ExpressDerivedWinModifierAtom);
  const[error,setError]=useState<string>("");
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
            setSettings(["backgroundImage",result as string])
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
    {createPortal(<style>{settings.customCSS}</style>,document.body)}
    <motion.div id="Settings">
      <h1>Settings</h1>
      <motion.div id="general">
        <motion.h2>Startup Apps</motion.h2>
        {Object.keys(settings.defaultOpenApps)
          .map(key=>key as AppKey)
          .map(key=><motion.div className="settingsRow" key={generateId(10)}>
            <motion.p>{key}</motion.p>
            <motion.input
              defaultChecked={settings.defaultOpenApps[key]}
              type="checkbox"
              onChange={(e)=>{
                setSettings(["defaultOpenApps",{
                  ...settings.defaultOpenApps,
                  [key]:e.target.checked
                }]);
              }}
              name={key}/>
          </motion.div>)}
      </motion.div><br/>
      <motion.div id="appearance">
        <motion.h2>Appearance</motion.h2>
        <motion.div className="settingsRow">
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
        </motion.div>
        <motion.div className="settingsRow">
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
              <option value="red">Red</option>
              <option value="orange">Orange</option>
              <option value="yellow">Yellow</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              {/*//?exclusive for testing
                // <option value="lib">DefaultLib</option> */}
          </select>
        </motion.div>
      </motion.div><br/>
      <motion.div id="background">
        <motion.h2>Background</motion.h2>
        <motion.h3>Upload a background</motion.h3>
        <DragAndDrop/>
        <motion.h3>Saved background</motion.h3>
        <p>Saved backgrounds may take a moment to delete</p>
        <SavedBackgrounds/>
      </motion.div><br/>
      <motion.div id="advanced">
        <motion.h2>Advanced Settings</motion.h2>
        <motion.div className="settingsRow">
          <motion.p>Confirm closing?</motion.p>
          <motion.input 
            defaultChecked={settings.closeConfirmation} 
            type="checkbox" 
            onChange={(e)=>{setSettings(["closeConfirmation",e.target.checked]);}} 
            name="closeConfirmation"/>
        </motion.div>
        <motion.p style={{fontSize:".75rem",opacity:".65"}}>(this usually helps with gg when teachers attempt tab closure)</motion.p><br/>
        <motion.p>Edit Custom CSS</motion.p>
        <motion.p style={{fontSize:".75rem",opacity:".65"}}>CSS stands for Cascading Style Sheets, and is the backbone of all website styling. If you'de like to learn how to use this section, check out <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Tutorials">This</a></motion.p>
        <motion.p className="error">{error}</motion.p>
        <motion.div
          className="textEditor"
          data-empty="Type in CSS here"
          onKeyDown={(e)=>{
            if(e.key==="Tab"){
              e.preventDefault();
              var sel=(e.currentTarget as HTMLDivElement).ownerDocument.defaultView!.getSelection();
              var range=sel!.getRangeAt(0);
              var tabNode=document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
              range.insertNode(tabNode);
              range.setStartAfter(tabNode);
              range.setEndAfter(tabNode); 
              sel!.removeAllRanges();
              sel!.addRange(range);
            }else if(e.key==='{'){
              e.preventDefault();
              const sel=(e.currentTarget as HTMLDivElement).ownerDocument.defaultView!.getSelection();
              const range=sel!.getRangeAt(0);
              const text=document.createTextNode('{\n\u00a0\u00a0\u00a0\u00a0\n}');
              range.insertNode(text);
              range.setStart(text,5);
              range.setEnd(text,5);
              sel!.removeAllRanges();
              sel!.addRange(range);
            }else if(e.key==='s'&&(e.ctrlKey||e.metaKey)){
              try{
                const css=(e.currentTarget as HTMLDivElement).innerText.replace(/\u00a0/g,' ');
                const expanded=postcss([postcssNesting()]).process(css,{from:undefined});
                const errors=csstree.validate(expanded.css);
                setError("");
                if(errors.length===0)setSettings(["customCSS",expanded.css]);
                else setError(`Invalid CSS:\n${errors.map((err:any)=>err.message).join("\n")}`);
              }catch(error){setError(`Invalid CSS: ${(error as Error).message}`);}
            }
          }}
          spellCheck="false" 
          autoCorrect="off" 
          autoCapitalize="off" 
          contentEditable>{settings.customCSS}</motion.div><br/>
        <motion.div className="settingsRow">
          <motion.p>Copy Settings</motion.p>
          <motion.button onClick={(e)=>{
            navigator.clipboard.writeText(JSON.stringify(settings,null,4))
              .catch(err=>{console.error('Failed to copy text: ',err);});
            }}>Copy Settings (as JSON)</motion.button>
        </motion.div>
        <motion.div className="settingsRow">
          <motion.p>Debug Menu</motion.p>
          <motion.button 
            onClick={()=>setWindow([["debug","open",true],["debug","minimized",false]])}>
          Open Debug Menu</motion.button>
        </motion.div>
        <motion.p>Edit Settings JSON</motion.p>
        <motion.p style={{fontSize:".875rem",opacity:".85"}}>This is for advanced users only. Please follow the type below, or it won't be accepted. Press ctrl+s to save</motion.p>
        <motion.div 
          className="textEditor type"
          style={{
            fontSize:".75rem",
            opacity:".65",
          }}>{JSON.stringify(z.toJSONSchema(SettingsAtomSchema),null,2)}</motion.div><br/>
        <motion.div
          className="textEditor"
          data-empty="Type in JSON data here"
          onKeyDown={(e)=>{
            if(e.key==="Tab"){
              e.preventDefault();
              var sel=(e.currentTarget as HTMLDivElement).ownerDocument.defaultView!.getSelection();
              var range=sel!.getRangeAt(0);
              var tabNode=document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
              range.insertNode(tabNode);
              range.setStartAfter(tabNode);
              range.setEndAfter(tabNode); 
              sel!.removeAllRanges();
              sel!.addRange(range);
            }else if(e.key==='s'&&(e.ctrlKey||e.metaKey)){
              try{
                const parsed=SettingsAtomSchema.safeParse(JSON.parse((e.currentTarget as HTMLDivElement).innerText));
                if(parsed.success)setSettingsDirect(parsed.data);
                else alert("Settings JSON did not match type");
              }catch(e){alert("Settings JSON was not valid");}
            }
          }}
          spellCheck="false" 
          autoCorrect="off" 
          autoCapitalize="off" 
          contentEditable>{JSON.stringify(settings,null,4)}</motion.div>
      </motion.div><br/>
      <motion.div id="dangerzone">
        <motion.h2>Danger Zone</motion.h2>
        <motion.button onClick={()=>{
          if(confirm("Would you really like to reset all settings?")){
            localStorage.clear();
            window.location.reload();}
        }}>Reset Settings</motion.button>
      </motion.div>
    </motion.div>
  </>);
}
export default Settings;