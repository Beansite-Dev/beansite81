import { motion } from "motion/react";
import { useEffect, type ReactElement } from "react";
import "./style.scss";
import { atom, useAtom } from "jotai";
import { errorAtom } from "../../../sdk/components/ErrorBoundary";
import { ExpressDerivedWinModifierAtom } from "../../../sdk/store";
import { FileSystemAtom, FilePropertyModifierAtom, FileCreatorAtom, FileDeletorAtom, FileMoverAtom, FileCopierAtom } from "../fs";
import { Tabs } from "@base-ui/react";
const directoryTreeAtom=atom<string[]>([]);
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
  return(<motion.div id="explorer">
    <motion.div id="explorerHeader">
      <Tabs.Root defaultValue="home">
        <Tabs.List className="list">
          <Tabs.Tab className="tab" value="file">File</Tabs.Tab>
          <Tabs.Tab className="tab" value="home">Home</Tabs.Tab>
          <Tabs.Indicator className="indicator"/>
        </Tabs.List>
        <Tabs.Panel className="panel" value="file">
        </Tabs.Panel>
        <Tabs.Panel className="panel" value="home">
        </Tabs.Panel>
      </Tabs.Root>
    </motion.div>
  </motion.div>);
}
export default Explorer;