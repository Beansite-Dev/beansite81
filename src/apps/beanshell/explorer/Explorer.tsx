import { motion, Reorder } from "motion/react";
import React, { Fragment, useEffect, useState, type ReactElement } from "react";
import "./style.scss";
import { atom, useAtom } from "jotai";
import { errorAtom } from "../../../sdk/components/ErrorBoundary";
import { ExpressDerivedWinModifierAtom } from "../../../sdk/store";
import { FileSystemAtom, FilePropertyModifierAtom, FileCreatorAtom, FileDeletorAtom, FileMoverAtom, FileCopierAtom } from "../fs";
import { ContextMenu, Tabs } from "@base-ui/react";
import { Icon, Icons } from "../../../sdk/components/Enum";
import { notepadAtom } from "../notepad/Notepad";
import { photosAtom } from "../photos/Photos";
import { propertiesAtom } from "./properties/Properties";
const directoryTreeAtom=atom<string[]>([]);
// const searchResAtom=atom<fs.DirectoryBase>({});
const historyAtom=atom<string[][]>([[],]);
const historyIndexAtom=atom<number>(0);
const clipboardAtom=atom<
  (fs.File|fs.Directory|fs.DirectoryBase|null)
  |(fs.File|fs.Directory|fs.DirectoryBase|null)[]>(null);
export const fileNameToEnglish=(x:fs.File|fs.Directory|fs.DirectoryBase):string=>{
  if(!x)return "File";
  if(x.isDirectory)return"File folder";
  else switch((x as fs.File).type){
    case"txt":return"Text Document";
    case"json":return"JSON Source File";
    case"exe":return"Beansite Executable";
    case"png":return"Image File";
    default:return`${(x as fs.File).type.toUpperCase()} File`;
  }
};
export const fileNameToIcon=(x:fs.File|fs.Directory|fs.DirectoryBase,showImagePreview=false):string=>{
  if(!x)return Icons.file;
  if(x.name=="DESKTOP-BS726")return(Icons.computer);
  if(x.isDirectory)return(Icons.directory);
  else switch((x as fs.File).type){
    case"txt":return Icons.text;
    case"json":return Icons.shellscript;
    case"exe":return Icons.application;
    case"png":
      if(showImagePreview){return((x as fs.File).content)}
      else return Icons.image;
    default:return Icons.file;
  }
};
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
  const[,setProperties]=useAtom(propertiesAtom);
  useEffect(()=>{console.warn(clipboard)},[clipboard]);
  const getScope=(directoryTree2=directoryTree):fs.DirectoryBase=>{
    var scope:fs.DirectoryBase=FileSystem;
    for(const dir of directoryTree2)
      if(scope[dir]&&scope[dir].isDirectory)scope=(scope[dir] as fs.Directory).children;
    return scope;
  };
  const[searchRes,setSearchRes]=useState<fs.DirectoryBase>(getScope());//useAtom(searchResAtom);
  const[notepad,setNotepad]=useAtom(notepadAtom);
  const[photos,setPhotos]=useAtom(photosAtom);
  const fileActions:{
    open:(x2:string)=>void;
    cleanSelected:()=>void;
    cut:(x2:string)=>void;
    copy:(x2:string)=>void;
    paste:()=>void;
    delete:(x2:string)=>void;
    getProperties:(x2:string)=>void;
    getPropertiesOfParent:()=>void;
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
        }else if((searchRes[x2] as fs.File).type=="png"){
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
    //!wip
    cut:()=>{
      document.querySelectorAll("#content .file.cut")
        .forEach(el=>el.classList.remove("cut"));
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
    copy:(x2:string)=>{if(searchRes[x2]){
      setClipboard(searchRes[x2]);}},
    paste:()=>{
      if(!clipboard)return;
      const scope=getScope();
      const getKey=(base:string,ext?:string):string=>{
        const full=(ext?`${base}.${ext}`:base);
        if(!scope[full])return full;
        let i=2;
        while(scope[ext?`${base} (${i}).${ext}`:base+` (${i})`])i++;
        return ext?`${base} (${i}).${ext}`:base+` (${i})`;
      };
      const items=Array.isArray(clipboard)?clipboard:[clipboard];
      items.forEach(item=>{
        if(!item)return;
        const file=item as fs.File;
        const dir=item as fs.Directory;
        //@ts-expect-error
        if(item.isDirectory)createFile([directoryTree,getKey(dir.name),dir]);
        else createFile([directoryTree,getKey(file.name,file.type),file]);
      });
    },
    delete:(x2:string)=>{
      //@ts-expect-error
      if(searchRes[x2].attributes.readOnly){
        setWindow([
          ["protectionError","open",true],
          ["protectionError","minimized",false],
        ]);return;
      }
      if(searchRes[x2])deleteFile([directoryTree,x2]);
    },
    getProperties:(x2:string)=>{
      if(!searchRes[x2])return;
      setProperties({directoryTree,file:(searchRes[x2] as fs.File|fs.Directory),});
      setWindow([
        ["properties","open",true],
        ["properties","minimized",false],
      ]);
    },
    getPropertiesOfParent:()=>{
      if(directoryTree.length===0){
        setProperties({directoryTree,file:{
          name:"DESKTOP-BS726",
          id:"root",
          isDirectory:true,
          children:FileSystem,
          attributes:{
            dateCreated:new Date(),
            dateModified:new Date(),
            openWithNotepad:false,
            system:true,
            readOnly:true,
          },
        }as fs.Directory});
      }else{
        const parentScope=getScope(directoryTree.slice(0,-1));
        const key=directoryTree[directoryTree.length-1];
        setProperties({directoryTree,file:parentScope[key] as fs.Directory});
      }
      setWindow([
        ["properties","open",true],
        ["properties","minimized",false],
      ]);
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
            <motion.div 
              className="action" 
              onClick={(e)=>{try{fileActions.copy(document.querySelectorAll(".selected")[0].getAttribute("data-filename") as string);}catch{}}}>
                <Icon icon="copy" className="icon"/>
                <motion.span>Copy</motion.span>
            </motion.div>
            <motion.div 
              className="action" 
              onClick={(e)=>fileActions.paste()}>
                <Icon icon="paste" className="icon"/>
                <motion.span>Paste</motion.span>
            </motion.div>
            <motion.span className="sectHeader">Clipboard</motion.span>
          </motion.div>
          <motion.div className="section">
            <motion.div 
              className="action" 
              onClick={(e)=>{try{fileActions.delete(document.querySelectorAll(".selected")[0].getAttribute("data-filename") as string);}catch{}}}>
                <Icon icon="delete" className="icon"/>
                <motion.span>Delete</motion.span>
            </motion.div>
            <motion.span className="sectHeader">Organize</motion.span>
          </motion.div>
          <motion.div className="section">
            <motion.div className="action">
              <Icon icon="directory" className="icon"/>
              <motion.span>Folder</motion.span>
            </motion.div>
            <motion.div className="action">
              <Icon icon="file" className="icon"/>
              <motion.span>Item</motion.span>
            </motion.div>
            <motion.span className="sectHeader">New</motion.span>
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
          data-filename={x}
          onClick={(e)=>{
            // if(!e.ctrlKey)
            // document.querySelectorAll("#content .file.selected")
            //   .forEach(el=>el.classList.remove("selected"));
            fileActions.cleanSelected();
            document.getElementById(btoa(x))?.classList.toggle("selected");
          }}
          id={searchRes[x]?btoa(x):""}
          onDoubleClick={()=>{fileActions.open(x);}}
          className="file">
            <motion.div
              style={{backgroundImage:`url(${fileNameToIcon(searchRes[x])})`}}
              className="icon li1"></motion.div>
            <motion.span className="li2">{x}</motion.span>
            <motion.span className="li3">{new Intl.DateTimeFormat('en-US',{
              month:'numeric',day:'numeric',year:'numeric',
              hour:'numeric',minute:'numeric',hour12:true,
            }).format(searchRes[x]
              ?(searchRes[x].attributes as fs.FileAttributes).dateModified
              :new Date())}</motion.span>
            <motion.span className="li4">{fileNameToEnglish(searchRes[x])}</motion.span>
            {/* <motion.span className="li5">{JSON.stringify(searchRes[x]).length} KB</motion.span> */}
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
                <ContextMenu.Item 
                  onClick={()=>fileActions.copy(x)}
                  className="fileCtxItem">Copy</ContextMenu.Item>
                <ContextMenu.Separator className="fileCtxSeparator"/>
                <ContextMenu.Item 
                  onClick={()=>fileActions.delete(x)}
                  className="fileCtxItem">Delete</ContextMenu.Item>
                <ContextMenu.Item className="fileCtxItem">Rename</ContextMenu.Item>
                <ContextMenu.Separator className="fileCtxSeparator"/>
                <ContextMenu.Item 
                  onClick={()=>fileActions.getProperties(x)}
                  className="fileCtxItem">Properties</ContextMenu.Item>
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
      <ContextMenu.Root>
        <ContextMenu.Trigger id="content" onClick={(e)=>{
          if((e.target as HTMLElement).id=="content")
            document.querySelectorAll("#content .file.selected")
              .forEach(el=>el.classList.remove("selected"));
        }}>
          <motion.div className="file header">
            <motion.div className="icon li1"></motion.div>
            <motion.span className="li2">Name</motion.span>
            <motion.span className="li3">Date Modified</motion.span>
            <motion.span className="li4">Type</motion.span>
          </motion.div>
          {Object.keys(searchRes).map((x,i)=>(<File {...{x,i}}/>))}
        </ContextMenu.Trigger>
        <ContextMenu.Portal container={document.getElementById("Beansite81")!}>
          <ContextMenu.Positioner 
            className="fileCtxPositioner" 
            alignOffset={5} 
            positionMethod="fixed">
              <ContextMenu.Popup className="fileCtxPopup">
                <ContextMenu.Item 
                  onClick={()=>{fileActions.paste()}} 
                  className="fileCtxItem">Paste</ContextMenu.Item>
                <ContextMenu.Separator className="fileCtxSeparator"/>
                <ContextMenu.Item 
                  onClick={()=>fileActions.getPropertiesOfParent()}
                  className="fileCtxItem">Properties</ContextMenu.Item>
              </ContextMenu.Popup>
          </ContextMenu.Positioner>
        </ContextMenu.Portal>
      </ContextMenu.Root>
    </motion.div>)
  }
  return(<motion.div id="explorer">
    <Header/>
    <Body/>
  </motion.div>);
}
export default Explorer;