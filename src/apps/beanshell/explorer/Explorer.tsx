import { motion } from "motion/react";
import React, { Fragment, useEffect, type ReactElement } from "react";
import "./style.scss";
import { atom, useAtom } from "jotai";
import { errorAtom } from "../../../sdk/components/ErrorBoundary";
import { ExpressDerivedWinModifierAtom } from "../../../sdk/store";
import { FileSystemAtom, FilePropertyModifierAtom, FileCreatorAtom, FileDeletorAtom, FileMoverAtom, FileCopierAtom } from "../fs";
import { Tabs } from "@base-ui/react";
import { Icons } from "../../../sdk/components/Enum";
const directoryTreeAtom=atom<string[]>([]);
const searchResAtom=atom<fs.DirectoryBase>({});
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
    const[searchRes,setSearchRes]=useAtom(searchResAtom);
    return(<motion.div id="explorerBody">
      <motion.div id="actionbar">
        <motion.button 
          className="actionButton">
            <motion.div 
              style={{backgroundImage:`url("${Icons.back}")`}}
              className="icon" 
              id="back"></motion.div>
        </motion.button>
        <motion.button 
          className="actionButton">
            <motion.div 
              style={{backgroundImage:`url("${Icons.forward}")`}}
              className="icon" 
              id="forward"></motion.div>
        </motion.button>
        <motion.button 
          className="actionButton">
            <motion.div 
              style={{backgroundImage:`url("${Icons.goUp}")`,scale:"65%",}}
              className="icon" 
              id="up"></motion.div>
        </motion.button>
        <motion.div id="directoryTree">
          {directoryTree.map((x,i)=><Fragment key={x+i}>
            <motion.span></motion.span>
          </Fragment>)}
        </motion.div>
        <motion.input
          placeholder={`Search ${directoryTree[directoryTree.length-1]||"This PC"} ⌕`}
          id="search"/>
      </motion.div>
    </motion.div>)
  }
  return(<motion.div id="explorer">
    <Header/>
    <Body/>
  </motion.div>);
}
export default Explorer;