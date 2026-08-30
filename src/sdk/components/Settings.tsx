import "./styles/Settings.scss";
import type { ReactElement } from "react";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { atom, useAtom } from "jotai";
import { isMotionComponent, motion, AnimatePresence } from "motion/react";
import { DerivedSettingsAtom, ExpressDerivedWinModifierAtom, SettingsAtom, SettingsAtomSchema, validAppKeys, type ISettingsAtom, type ICustomCSSFile } from "../store";
import{ useDropzone } from "react-dropzone";
import { defaultBackgrounds, sbgdb, type IsavedBackgrounds } from "./store/savedbg.db";
import { generateId } from "../Lib";
import { useLiveQuery } from "dexie-react-hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import z from "zod";
//@ts-expect-error
import * as csstree from 'csstree-validator';
import { createPortal } from "react-dom";
import { FileSystemAtom } from "../../apps/beanshell/fs";
const debug=false; //toggle for verbose settings logging
const saveFile=(data:string,filename:string)=>
  document.body.appendChild(Object.assign(document.createElement('a'),{href:'data:text/json;charset=utf-8,'+encodeURIComponent(data),download:filename})).click();
type AppKey=typeof validAppKeys[number];
type SetSettings=<K extends keyof ISettingsAtom>(update:[K,ISettingsAtom[K]])=>void;
const CustomCSSFiles=({customCSSFiles,setSettings}:{customCSSFiles:ICustomCSSFile[];setSettings:SetSettings}):ReactElement=>{
  return(<motion.div className="customCSSFileList">
    {customCSSFiles.length===0
      ?<motion.p style={{fontSize:".75rem",opacity:".65",padding:".375rem .5rem"}}>No custom CSS files uploaded yet</motion.p>
      :customCSSFiles.map((x:ICustomCSSFile)=><motion.div key={x.id} className="customCSSFileRow">
        <motion.p onClick={()=>{setSettings(["customCSS",x.css]);}}>{x.name}</motion.p>
        <motion.button className="trashButton" onClick={()=>{
          setSettings(["customCSSFiles",customCSSFiles.filter((f:any)=>f.id!==x.id)]);
        }}><FontAwesomeIcon icon={faTrash}/></motion.button>
      </motion.div>)}
  </motion.div>);
}
const DragAndDrop=({setSettings}:{setSettings:SetSettings}):ReactElement=>{
  const{getRootProps,getInputProps}=useDropzone({
    onDrop:(files:File[]):void=>{
      const file=files[0];
      if(!file)return;
      if(debug)console.log(file);
      const reader=new FileReader();
      reader.onload=async(e)=>{
        const result=e.target?.result;
        try{
          const res:IsavedBackgrounds={
            id:generateId(10),
            name:file.name,
            src:file,
            deletable:true,
          };
          if(debug)console.log(res);
          setSettings(["backgroundImage",result as string]);
          await sbgdb.saved.put(res);
        }catch(e){};
      }
      reader.readAsDataURL(file);
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
const useObjectUrl=(src:Blob|string):string=>{
  const isBlob=src instanceof Blob;
  const url=useMemo(()=>isBlob?URL.createObjectURL(src as Blob):src as string,[src]);
  useEffect(()=>{
    return()=>{if(isBlob)URL.revokeObjectURL(url);};
  },[url]);
  return url;
};
const SavedBackground=({x,setSettings}:{x:IsavedBackgrounds;setSettings:SetSettings}):ReactElement=>{
  const[deleting,setDeleting]=useState<boolean>(false);
  const url=useObjectUrl(x.src);
  return(<motion.div onClick={()=>{
    setSettings(["backgroundImage",url]);
  }} key={x.id} className="savedBg">
    {deleting?<motion.div className="deleting">Deleting...</motion.div>:null}
    <motion.div className="bg" style={{
      backgroundImage:`url("${url}")`,
    }}></motion.div>
    {x.deletable?<motion.button className="trashButton" onClick={()=>{
      setDeleting(true);
      sbgdb.transaction('rw',sbgdb.saved,function*(){
        yield sbgdb.saved.filter(i=>i.id==x.id).delete();
      }).catch(e=>{
        if(debug)console.error(e);
        setDeleting(false); //reset so the row isn't stuck on "Deleting..." forever
      });
    }}><FontAwesomeIcon icon={faTrash}/></motion.button>:null}
  </motion.div>);
}
const SavedBackgrounds=({setSettings}:{setSettings:SetSettings}):ReactElement=>{
  const savedBackgrounds=useLiveQuery(()=>sbgdb.saved.toArray());
  useEffect(()=>{
    if(debug)console.warn(savedBackgrounds);
  },[savedBackgrounds]);
  return(<><Suspense fallback={<motion.h1>Loading Saved Backgrounds...</motion.h1>}>
    <motion.div className="backgroundSelector">
      {savedBackgrounds
        ?[...defaultBackgrounds,...savedBackgrounds]!
          .map((x:IsavedBackgrounds)=><SavedBackground key={x.id} x={x} setSettings={setSettings}/>)
        :<motion.h2>Loading...</motion.h2>}
    </motion.div>
  </Suspense></>);
};
const Settings=({}):ReactElement=>{
  const[settings,setSettings]=useAtom(DerivedSettingsAtom);
  const[,setSettingsDirect]=useAtom(SettingsAtom);
  const[,setWindow]=useAtom(ExpressDerivedWinModifierAtom);
  const[error,setError]=useState<string>("");
  const[search,setSearch]=useState<string>("");
  const matches=(label:string):boolean=>!search.trim()||label.toLowerCase().includes(search.trim().toLowerCase());
  const customCSSFileInputRef=useRef<HTMLInputElement>(null);
  const handleCustomCSSUpload=(e:React.ChangeEvent<HTMLInputElement>):void=>{
    const file=e.target.files?.[0];
    if(!file)return;
    const reader=new FileReader();
    reader.onload=(ev)=>{
      const css=ev.target?.result as string;
      try{
        const errors=csstree.validate(css);
        if(errors.length>0){setError(`Invalid CSS:\n${errors.map((err:any)=>err.message).join("\n")}`);return;}
        setError("");
        const newFile:ICustomCSSFile={id:generateId(10),name:file.name,css};
        setSettings(["customCSSFiles",[...settings.customCSSFiles,newFile]]);
        setSettings(["customCSS",css]);
      }catch(err){setError(`Invalid CSS: ${(err as Error).message}`);}
    };
    reader.readAsText(file);
    e.target.value="";
  };
  const[Filesystem,]=useAtom(FileSystemAtom);
  const generalMatch=matches("Startup Apps");
  const appearanceMatch=matches("Appearance");
  const backgroundMatch=matches("Background");
  const advancedMatch=matches("Advanced Settings");
  const dangerMatch=matches("Danger Zone");
  const generalVisible=generalMatch||Object.keys(settings.defaultOpenApps).some(key=>matches(key));
  const appearanceVisible=appearanceMatch||matches("Select a font")||matches("Select a theme");
  const backgroundVisible=backgroundMatch||matches("Upload a background")||matches("Saved background");
  const advancedVisible=advancedMatch
    ||matches("Confirm closing")
    ||matches("Edit Custom CSS")
    ||matches("Custom CSS Files")
    ||matches("Copy Settings to Clipboard")
    ||matches("Export Settings")
    ||matches("Copy Virtual Filesystem")
    ||matches("Export Virtual Filesystem")
    ||matches("Debug Menu")
    ||matches("Edit Settings JSON");
  const dangerVisible=dangerMatch||matches("Reset Settings")||matches("Reset Mods");
  return(<>
    {createPortal(<style>{settings.customCSS}</style>,document.body)}
    <motion.div id="Settings">
      <h1>Settings</h1>
      <motion.div className="settingsRow searchRow">
        <motion.p>Search Settings</motion.p>
        <input
          type="text"
          id="settingsSearch"
          placeholder="e.g. theme, background, debug"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}/>
      </motion.div><br/>
      {generalVisible&&<><motion.div id="general">
        <motion.h2>Startup Apps</motion.h2>
        {Object.keys(settings.defaultOpenApps)
          .map(key=>key as AppKey)
          .filter(key=>generalMatch||matches(key))
          .map(key=><motion.div className="settingsRow" key={key}>
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
      </motion.div><br/></>}
      {appearanceVisible&&<><motion.div id="appearance">
        <motion.h2>Appearance</motion.h2>
        {(appearanceMatch||matches("Select a font"))&&<motion.div className="settingsRow">
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
        </motion.div>}
        {(appearanceMatch||matches("Select a theme"))&&<motion.div className="settingsRow">
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
              <option value="custom">Custom</option>
          </select>
        </motion.div>}
      </motion.div><br/></>}
      {backgroundVisible&&<><motion.div id="background">
        <motion.h2>Background</motion.h2>
        {(backgroundMatch||matches("Upload a background"))&&<>
          <motion.h3>Upload a background</motion.h3>
          <DragAndDrop setSettings={setSettings}/>
        </>}
        {(backgroundMatch||matches("Saved background"))&&<>
          <motion.h3>Saved background</motion.h3>
          <p>Saved backgrounds may take a moment to delete</p>
          <SavedBackgrounds setSettings={setSettings}/>
        </>}
      </motion.div><br/></>}
      {advancedVisible&&<><motion.div id="advanced">
        <motion.h2>Advanced Settings</motion.h2>
        {(advancedMatch||matches("Confirm closing"))&&<>
          <motion.div className="settingsRow">
            <motion.p>Confirm closing?</motion.p>
            <motion.input 
              defaultChecked={settings.closeConfirmation} 
              type="checkbox" 
              onChange={(e)=>{setSettings(["closeConfirmation",e.target.checked]);}} 
              name="closeConfirmation"/>
          </motion.div>
          <motion.p style={{fontSize:".75rem",opacity:".65"}}>(this usually helps with gg when teachers attempt tab closure)</motion.p><br/>
        </>}
        {(advancedMatch||matches("Edit Custom CSS"))&&<>
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
                e.preventDefault();
                try{
                  const css=(e.currentTarget as HTMLDivElement).innerText.replace(/\u00a0/g,' ');
                  const errors=csstree.validate(css);
                  setError("");
                  if(errors.length===0)setSettings(["customCSS",css]);
                  else setError(`Invalid CSS:\n${errors.map((err:any)=>err.message).join("\n")}`);
                }catch(error){setError(`Invalid CSS: ${(error as Error).message}`);}
              }
            }}
            spellCheck="false" 
            autoCorrect="off" 
            autoCapitalize="off" 
            contentEditable>{settings.customCSS}</motion.div><br/>
        </>}
        {(advancedMatch||matches("Custom CSS Files"))&&<>
          <motion.p>Custom CSS Files</motion.p>
          <motion.p style={{fontSize:".75rem",opacity:".65"}}>Upload a .css file to save it as a selectable custom theme. Click a saved file's name to load it into the editor above and apply it.</motion.p>
          <motion.div className="settingsRow">
            <motion.p>Upload CSS File</motion.p>
            <motion.button onClick={()=>customCSSFileInputRef.current?.click()}>Upload CSS</motion.button>
            <input ref={customCSSFileInputRef} type="file" accept=".css,text/css" style={{display:"none"}} onChange={handleCustomCSSUpload}/>
          </motion.div>
          <CustomCSSFiles customCSSFiles={settings.customCSSFiles} setSettings={setSettings}/><br/>
        </>}
        {(advancedMatch||matches("Copy Settings to Clipboard"))&&<motion.div className="settingsRow">
          <motion.p>Copy Settings to Clipboard (as JSON)</motion.p>
          <motion.button onClick={(e)=>{
            navigator.clipboard.writeText(JSON.stringify(settings,null,4))
              .catch(err=>{console.error('Failed to copy text: ',err);});
            }}>Copy</motion.button>
        </motion.div>}
        {(advancedMatch||matches("Export Settings"))&&<motion.div className="settingsRow">
          <motion.p>Export Settings (as JSON)</motion.p>
          <motion.button onClick={(e)=>{saveFile(JSON.stringify(settings,null,4),'settings.json');}}>Export as JSON</motion.button>
        </motion.div>}
        {(advancedMatch||matches("Copy Virtual Filesystem"))&&<motion.div className="settingsRow">
          <motion.p>Copy Virtual Filesystem (as JSON)</motion.p>
          <motion.button onClick={(e)=>{
            navigator.clipboard.writeText(JSON.stringify(Filesystem,null,4))
              .catch(err=>{console.error('Failed to copy text: ',err);});
            }}>Copy</motion.button>
        </motion.div>}
        {(advancedMatch||matches("Export Virtual Filesystem"))&&<motion.div className="settingsRow">
          <motion.p>Export Virtual Filesystem (as JSON)</motion.p>
          <motion.button onClick={(e)=>{saveFile(JSON.stringify(Filesystem,null,4),'filesystem.json');}}>Export as JSON</motion.button>
        </motion.div>}
        {(advancedMatch||matches("Debug Menu"))&&<motion.div className="settingsRow">
          <motion.p>Debug Menu</motion.p>
          <motion.button 
            onClick={()=>setWindow([["debug","open",true],["debug","minimized",false]])}>
          Open Debug Menu</motion.button>
        </motion.div>}
        {(advancedMatch||matches("Edit Settings JSON"))&&<>
          <br/>
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
                e.preventDefault();
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
        </>}
      </motion.div><br/></>}
      {dangerVisible&&<><motion.div id="dangerzone">
        <motion.h2>Danger Zone</motion.h2>
        {(dangerMatch||matches("Reset Settings"))&&<motion.button onClick={()=>{
          if(confirm("Would you really like to reset all settings?")){
            localStorage.clear();
            window.location.reload();}
        }}>Reset Settings</motion.button>}
        {(dangerMatch||matches("Reset Mods"))&&<motion.button 
          style={{marginLeft:".25rem"}}
          onClick={()=>{
            if(confirm("Would you really like to reset all mods?")){
              const currentUrl=new URL(window.location.href);
              currentUrl.searchParams.append("resetMods","");
              window.history.replaceState({},"",currentUrl.toString());
              location.reload();
            }
          }}>Reset Mods</motion.button>}
      </motion.div></>}
    </motion.div>
  </>);
}
export default Settings;