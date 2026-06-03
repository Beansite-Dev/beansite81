import { atom, Provider, useAtom } from "jotai";
import { useEffect, type ReactElement } from "react";
import { generateId } from "../../../sdk/Lib";
import { Icons } from "../../../sdk/components/Enum";
import { Window } from "../../../sdk/sdk";
import { SettingsAtom, WinAtom } from "../../../sdk/store";
export interface InotepadAtom{
  isOpen:boolean;
  contents:string;
  directoryTree:string[];
  file:fs.File;
}
export const notepadAtom=atom<InotepadAtom>({
  isOpen:false,
  contents:"",
  directoryTree:[],
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
  const[windows]=useAtom(WinAtom);
  useEffect(()=>{
    // if(windows.find(x=>x.id=="notepad")!.open)
      // setNotepad({...notepad,isOpen:true});
  },[windows]);
  // const[settings,]=useAtom(SettingsAtom);
  return(<>
    <Window
      id="explorer"
      y={50}
      x={50}
      height={350}
      bounds={bounds}
      width={350*(16/10)}
      closed={notepad.isOpen}
      icon={Icons.notepad}
      title={`Notepad - editing ${notepad.file.name}.${notepad.file.type}`}>
        {/* @ts-ignore */}

    </Window>
  </>);
};
export default Notepad;