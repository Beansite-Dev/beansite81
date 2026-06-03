import { motion, Reorder } from "motion/react";
import React, { Fragment, useEffect, useState, type ReactElement } from "react";
import "./style.scss";
import { atom, useAtom } from "jotai";
import { errorAtom } from "../../../sdk/components/ErrorBoundary";
import { ExpressDerivedWinModifierAtom } from "../../../sdk/store";
import { FileSystemAtom, FilePropertyModifierAtom, FileCreatorAtom, FileDeletorAtom, FileMoverAtom, FileCopierAtom } from "../fs";
import { Tabs } from "@base-ui/react";
import { Icons } from "../../../sdk/components/Enum";
const directoryTreeAtom=atom<string[]>([]);
const searchResAtom=atom<fs.DirectoryBase>({});
const historyAtom=atom<string[][]>([[],]);
const historyIndexAtom=atom<number>(0);
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
  const getScope=():fs.DirectoryBase=>{
    var scope:fs.DirectoryBase=FileSystem;
    for(const dir of directoryTree)
      if(scope[dir]&&scope[dir].isDirectory)scope=(scope[dir] as fs.Directory).children;
    return scope;
  };
  const Header=({}):ReactElement=>{
    return(<motion.div id="explorerHeader">
      <Tabs.Root defaultValue="home">
        <Tabs.List className="list">
          <Tabs.Tab className="tab file" value="file">File</Tabs.Tab>
          <Tabs.Tab className="tab" value="home">Home</Tabs.Tab>
          <Tabs.Indicator className="indicator"/>
        </Tabs.List>
        <Tabs.Panel className="panel" value="file">
          
        </Tabs.Panel>
        <Tabs.Panel className="panel" value="home">
          
        </Tabs.Panel>
      </Tabs.Root>
    </motion.div>);
  }
  const Body=({}):ReactElement=>{
    const[searchRes,setSearchRes]=useState<fs.DirectoryBase>(getScope());//useAtom(searchResAtom);
    useEffect(()=>{setSearchRes(getScope());},[directoryTree]);
    // useEffect(()=>{setDirectoryTree(history[historyIndex]||[])},[historyIndex])
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
          id="search"/>
      </motion.div>
      <motion.div id="content">
        {Object.keys(searchRes).map((x,i)=>(
          <motion.div 
            onClick={()=>{
              if(searchRes[x]){
                if(searchRes[x].isDirectory){
                  setHistory(y=>y.concat([[...directoryTree,x]]));
                  setDirectoryTree([...directoryTree,x]);
                  setHistoryIndex(x=>x+1);
                }else{
                  if((searchRes[x] as fs.File).type=="exe"
                  ||!!(searchRes[x] as fs.File).attributes.exeLaunchTarget){
                    setWindow([
                      [(searchRes[x] as fs.File).attributes.exeLaunchTarget!,"open",true],
                      [(searchRes[x] as fs.File).attributes.exeLaunchTarget!,"minimized",false],
                    ]);
                  }
                }
              }
            }}
            className="file" 
            key={i}>
              <motion.div
                style={{backgroundImage:`url(${searchRes[x]?
                  searchRes[x].isDirectory?Icons.directory
                  :(searchRes[x]as fs.File).type=="txt"?Icons.text
                  :(searchRes[x]as fs.File).type=="json"?Icons.shellscript
                  :(searchRes[x]as fs.File).type=="exe"?Icons.shellscript
                  :Icons.file:Icons.file})`}}
                className="icon"></motion.div>
              <motion.span>{x}</motion.span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>)
  }
  return(<motion.div id="explorer">
    <Header/>
    <Body/>
  </motion.div>);
}
export default Explorer;