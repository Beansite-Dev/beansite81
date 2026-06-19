import { motion, Reorder } from "motion/react";
import React, { Fragment, useEffect, useState, type ReactElement } from "react";
import "./style.scss";
import { atom, useAtom } from "jotai";
import { errorAtom } from "../../../sdk/components/ErrorBoundary";
import { ExpressDerivedWinModifierAtom } from "../../../sdk/store";
import { FileSystemAtom, FilePropertyModifierAtom, FileCreatorAtom, FileDeletorAtom, FileMoverAtom, FileCopierAtom } from "../fs";
import { ContextMenu, Tabs } from "@base-ui/react";
import { Icons } from "../../../sdk/components/Enum";
import { notepadAtom } from "../notepad/Notepad";
import { photosAtom } from "../photos/Photos";
const directoryTreeAtom=atom<string[]>([]);
// const searchResAtom=atom<fs.DirectoryBase>({});
const historyAtom=atom<string[][]>([[],]);
const historyIndexAtom=atom<number>(0);
const clipboardAtom=atom<
  (fs.File|fs.Directory|fs.DirectoryBase|null)
  |(fs.File|fs.Directory|fs.DirectoryBase|null)[]>(null);
const Explorer=({}):ReactElement=>{
  const[,setWindow]=useAtom(ExpressDerivedWinModifierAtom);
  const[,setError]=useAtom(errorAtom);
  const[FileSystem,setFileSystem]=useAtom(FileSystemAtom);
  const[,setFileProperty]=useAtom(FilePropertyModifierAtom);
  const[,createFile]=useAtom(FileCreatorAtom);
  const[,deleteFile]=useAtom(FileDeletorAtom);
  const[,moveFile]=useAtom(FileMoverAtom);
  const[,copyFile]=useAtom(FileCopierAtom);
  const[directoryTree,setDirectoryTree]=useAtom(directoryTreeAtom);
  const[history,setHistory]=useAtom(historyAtom);
  const[historyIndex,setHistoryIndex]=useAtom(historyIndexAtom);
  const[clipboard,setClipboard]=useAtom(clipboardAtom);
  const getScope=():fs.DirectoryBase=>{
    var scope:fs.DirectoryBase=FileSystem;
    for(const dir of directoryTree)
      if(scope[dir]&&scope[dir].isDirectory)scope=(scope[dir] as fs.Directory).children;
    return scope;
  };
  const[searchRes,setSearchRes]=useState<fs.DirectoryBase>(getScope());//useAtom(searchResAtom);
  const[notepad,setNotepad]=useAtom(notepadAtom);
  const[photos,setPhotos]=useAtom(photosAtom);
  const fileActions:{
    open:(x2:string)=>void;
    cleanSelected:()=>void;
    cut:()=>void;
  }={
    open:(x2:string)=>{if(searchRes[x2]){
        if(searchRes[x2].isDirectory){
          setHistory(y=>y.concat([[...directoryTree,x2]]));
          setDirectoryTree([...directoryTree,x2]);
          setHistoryIndex(x=>x+1);
      }else{
        if((searchRes[x2] as fs.File).type=="exe"
        ||!!(searchRes[x2] as fs.File).attributes.exeLaunchTarget){
          setWindow([
            [(searchRes[x2] as fs.File).attributes.exeLaunchTarget!,"open",true],
            [(searchRes[x2] as fs.File).attributes.exeLaunchTarget!,"minimized",false],
          ]);
        }else if((searchRes[x2] as fs.File).attributes.openWithNotepad){
          setNotepad({
            ...notepad,
            file:searchRes[x2] as fs.File,
            directoryTree,
          });
          setWindow([
            ["notepad","open",true],
            ["notepad","minimized",false],
          ]);
        }else if((searchRes[x2] as fs.File).type=="image"){
          setPhotos({
            ...photos,
            file:searchRes[x2] as fs.File,
            directoryTree,
          });
          setWindow([
            ["photos","open",true],
            ["photos","minimized",false],
          ]);
        }
      }
    }},
    cleanSelected:()=>{
      document.querySelectorAll("#content .file.selected")
        .forEach(el=>el.classList.remove("selected"));},
    cut:()=>{
      document.querySelectorAll("#content .file.cut")
        .forEach(el=>el.classList.remove("cut"));
      document.querySelectorAll("#content .file.selected")
        .forEach(el=>el.classList.add("cut"));
      setClipboard(Array.from(
        document.querySelectorAll("#content .file.selected"),
        el=>searchRes[atob(el.id)]
          ?searchRes[atob(el.id)]
          :null,
      ));
      fileActions.cleanSelected();
    },
  };
  const Header=({}):ReactElement=>{
    return(<motion.div id="explorerHeader">
      <Tabs.Root defaultValue="home">
        <Tabs.List className="list">
          <motion.button className="tab file">File</motion.button>
          {/* <Tabs.Tab className="tab file" value="file">File</Tabs.Tab> */}
          <Tabs.Tab className="tab" value="home">Home</Tabs.Tab>
          <Tabs.Indicator className="indicator"/>
        </Tabs.List>
        <Tabs.Panel className="panel" value="home">
          <motion.div className="section">
            <motion.span className="sectHeader">Clipboard</motion.span>
          </motion.div>
        </Tabs.Panel>
      </Tabs.Root>
    </motion.div>);
  }
  const Body=({}):ReactElement=>{
    useEffect(()=>{setSearchRes(getScope());},[directoryTree]);
    // useEffect(()=>{setDirectoryTree(history[historyIndex]||[])},[historyIndex])
    const File=({x,i}:{x:string,i:number}):ReactElement=>{
      return(<ContextMenu.Root key={i}>
        <ContextMenu.Trigger  
          onClick={(e)=>{
            if(!e.ctrlKey)
              document.querySelectorAll("#content .file.selected")
                .forEach(el=>el.classList.remove("selected"));
            document.getElementById(btoa(x))?.classList.toggle("selected");
          }}
          id={searchRes[x]?btoa(x):""}
          onDoubleClick={()=>{fileActions.open(x);}}
          className="file">
            <motion.div
              style={{backgroundImage:`url(${searchRes[x]?
                searchRes[x].isDirectory?Icons.directory
                :(searchRes[x]as fs.File).type=="txt"?Icons.text
                :(searchRes[x]as fs.File).type=="json"?Icons.shellscript
                :(searchRes[x]as fs.File).type=="exe"?Icons.shellscript
                :(searchRes[x]as fs.File).type=="image"?Icons.image
                :Icons.file:Icons.file})`}}
              className="icon"></motion.div>
            <motion.span>{x}</motion.span>
        </ContextMenu.Trigger>
        <ContextMenu.Portal container={document.getElementById("Beansite81")!}>
          <ContextMenu.Positioner 
            className="fileCtxPositioner" 
            alignOffset={5} 
            positionMethod="fixed">
              <ContextMenu.Popup className="fileCtxPopup">
                <ContextMenu.Item 
                  style={{fontWeight:"600"}} 
                  className="fileCtxItem"
                  onClick={()=>fileActions.open(x)}>Open</ContextMenu.Item>
                <ContextMenu.Separator className="fileCtxSeparator"/>
                {/* <ContextMenu.Item 
                  className="fileCtxItem"
                  onClick={()=>fileActions.cut()}>Cut</ContextMenu.Item> */}
                <ContextMenu.Item className="fileCtxItem">Copy</ContextMenu.Item>
                <ContextMenu.Separator className="fileCtxSeparator"/>
                <ContextMenu.Item className="fileCtxItem">Delete</ContextMenu.Item>
                <ContextMenu.Item className="fileCtxItem">Rename</ContextMenu.Item>
                <ContextMenu.Separator className="fileCtxSeparator"/>
                <ContextMenu.Item className="fileCtxItem">Properties</ContextMenu.Item>
              </ContextMenu.Popup>
          </ContextMenu.Positioner>
        </ContextMenu.Portal>
      </ContextMenu.Root>);
    };
    return(<motion.div id="explorerBody">
      <motion.div id="actionbar">
        <motion.button 
          onClick={()=>{
            if(historyIndex<=0)return;
            setDirectoryTree(history[historyIndex-1]);
            setHistoryIndex(x=>x-1);
          }}
          style={historyIndex<=0?{opacity:".5",pointerEvents:"none"}:{}}
          className="actionButton">
            <motion.div 
              style={{backgroundImage:`url("${Icons.back}")`}}
              className="icon" 
              id="back"></motion.div>
        </motion.button>
        <motion.button 
          onClick={()=>{
            if(historyIndex>=history.length)return;
            console.warn(history);
            console.log(historyIndex+1,historyIndex);
            console.log(history[historyIndex+1]);
            setDirectoryTree(history[historyIndex+1]||[]);
            setHistoryIndex(x=>x+1);
          }}
          style={historyIndex>=history.length?{opacity:".5",pointerEvents:"none"}:{}}
          className="actionButton">
            <motion.div 
              style={{backgroundImage:`url("${Icons.forward}")`}}
              className="icon" 
              id="forward"></motion.div>
        </motion.button>
        <motion.button 
          onClick={(e)=>{
            setDirectoryTree(x=>!!x.slice(0,-1)?x.slice(0,-1):[]);}}
          className="actionButton">
            <motion.div 
              style={{backgroundImage:`url("${Icons.goUp}")`,scale:"65%",}}
              className="icon" 
              id="up"></motion.div>
        </motion.button>
        <motion.div id="directoryTree">
          <motion.span onClick={(e)=>{
            setHistory(h=>h.concat([[]]));
            setDirectoryTree([]);
            setHistoryIndex(x=>x+1);
          }} className="directory">{"C:"}</motion.span>
          <motion.span className="arrow">{">"}</motion.span>
          {directoryTree.map((x,i)=><Fragment key={x+i}>
            <motion.span onClick={()=>{
              setHistory(y=>y.concat([directoryTree.slice(0,i+1)]));
              setDirectoryTree(directoryTree.slice(0,i+1));
              setHistoryIndex(x=>x+1);
            }} className="directory">{`${x}`}</motion.span>
            <motion.span className="arrow">{">"}</motion.span>
          </Fragment>)}
        </motion.div>
        <motion.input
          placeholder={`Search ${directoryTree[directoryTree.length-1]||"This PC"} ⌕`}
          onChange={(e)=>{
            const val=e.currentTarget.value;
            if(!val)return setSearchRes(getScope());
            else setSearchRes(Object.fromEntries(
              Object.entries(getScope())
                .filter(([k,v])=>k.toLowerCase().includes(val.toLowerCase()))
              ));
          }}
          id="search"/>
      </motion.div>
      <motion.div id="content" onClick={(e)=>{
        if((e.target as HTMLElement).id=="content")
          document.querySelectorAll("#content .file.selected")
            .forEach(el=>el.classList.remove("selected"));
      }}>{Object.keys(searchRes).map((x,i)=>(<File {...{x,i}}/>))}</motion.div>
    </motion.div>)
  }
  return(<motion.div id="explorer">
    <Header/>
    <Body/>
  </motion.div>);
}
export default Explorer;