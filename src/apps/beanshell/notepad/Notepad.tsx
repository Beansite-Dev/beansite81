import { atom, Provider, useAtom } from "jotai";
import { useEffect, useRef, type ReactElement } from "react";
import { generateId } from "../../../sdk/Lib";
import { Icons } from "../../../sdk/components/Enum";
import { Window } from "../../../sdk/sdk";
import { ExpressDerivedWinModifierAtom, SettingsAtom, WinAtom } from "../../../sdk/store";
import { motion } from "motion/react";
import type React from "react";
import "./style.scss";
import { FilePropertyModifierAtom, FileCreatorAtom } from "../fs";
export interface InotepadAtom{
  // isOpen:boolean;
  creating:boolean;
  directoryTree:string[];
  file:fs.File;
}
export const notepadAtom=atom<InotepadAtom>({
  // isOpen:false,
  directoryTree:[],
  creating:true,
  file:{
    name:"new",
    isDirectory:false,
    type:"txt",
    content:"",
    id:generateId(10),
    attributes:{
      dateCreated:new Date(),
      openWithNotepad:true,
    }
  },
});
const Notepad=({bounds}:{bounds:any}):ReactElement=>{
  const[notepad,setNotepad]=useAtom(notepadAtom);
  const[windows,setWindow]=useAtom(ExpressDerivedWinModifierAtom);
  const[settings,]=useAtom(SettingsAtom);
  const[,setFileProperty]=useAtom(FilePropertyModifierAtom);
  const[,createFile]=useAtom(FileCreatorAtom);
  const npRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{console.warn(notepad)},[notepad]);
  useEffect(()=>{
    if(windows.find(w=>w.id==="notepad"&&!w.minimized&&w.open))
      npRef?.current?.focus();
  },[windows]);
  function saveFile(){
    if(!notepad.creating)
      setFileProperty([
        notepad.directoryTree,
        notepad.file.name,
        "content",
        npRef?.current?.innerText||""
      ]);
    else{
      createFile([
        notepad.directoryTree,
        `${notepad.file.name}.${notepad.file.type}`||"newfile.txt",
        {
          name:notepad.file.name||"newfile",
          id:generateId(10),
          isDirectory:false,
          type:notepad.file.type||"txt",
          content:npRef?.current?.innerText||"",
          attributes:{
            dateCreated:new Date(),
            openWithNotepad:true,
          }
        }
      ]);
    }
    setTimeout(()=>npRef?.current?.focus(),0);
  }
  return(<>
    <Window
      id="notepad"
      y={50}
      x={50}
      height={350}
      bounds={bounds}
      width={350*(16/10)}
      closed={!settings.defaultOpenApps.notepad}
      icon={Icons.notepad}
      title={`Notepad - editing ${notepad.file.name}.${notepad.file.type}`}>
        {/* @ts-ignore */}
      <motion.div
        style={{
          height:"calc(100% - 1rem - 3rem)",
          width:"100%",
          overflowY:"auto",
          overflowX:"hidden",
        }}
        id="npWrapper"
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
          }if(e.key==='s'&&(e.ctrlKey||e.metaKey)){
            e.preventDefault();
            console.log("ctrl+s pressed => saving file");
            saveFile();
          }
        }}
        spellCheck="false" 
        autoCorrect="off" 
        autoCapitalize="off" 
        contentEditable
        ref={npRef}>{notepad.file.content||""}</motion.div>
    </Window>
  </>);
};
export default Notepad;