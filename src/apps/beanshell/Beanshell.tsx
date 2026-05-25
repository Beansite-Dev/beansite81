import { isValidElement, useEffect, useRef, useState, type CSSProperties, type ReactElement } from "react";
import "./style.scss";
import { motion } from "motion/react";
import { generateId } from "../../sdk/Lib";
import { ExpressDerivedWinModifierAtom } from "../../sdk/store";
import { atom, useAtom } from "jotai";
import { FileCreatorAtom, FilePropertyModifierAtom, FileSystemAtom, type Directory, type DirectoryBase, type File } from "./fs";
// type Abbreviated<T,M>={[K in keyof T as K|{[P in keyof M]:M[P]extends K?P:never}[keyof M]]:T[K];};
type Colors=
  "Black"|"BrightBlack"|"Gray"|"DarkGray"|"BrightGray"|"White"|"BrightWhite"|
  "Blue"|"DarkBlue"|"BrightBlue"|
  "Green"|"DarkGreen"|"BrightGreen"|
  "Cyan"|"DarkCyan"|"BrightCyan"|
  "Red"|"DarkRed"|"BrightRed"|
  "Magenta"|"DarkMagenta"|"BrightMagenta"|
  "Yellow"|"DarkYellow"|"BrightYellow"|
  "Transparent";
interface ColorTypes{
  /*color*/clr?:Colors;
  /*background*/bg?:Colors;
  /*italics*/i?:boolean;
  /*bold*/b?:boolean;
  /*underline*/u?:boolean;
};
interface BeanshellStyledText extends ColorTypes{/*contents*/c?:string;};
interface BeanshellLogs extends ColorTypes{
  /*message*/m?:BeanshellStyledText|BeanshellStyledText[]|string;
  /*type*/t:
    "log"|"l"|
    "newline"|"nl"|
    "NerdFontIcon"|"nf";
  includeNewline?:boolean;
  noWordBreak?:boolean;
  customStyling?:CSSProperties;
};
const stylePresets:{[str:string]:ColorTypes|BeanshellLogs}={
  error:{
    clr:"Red",
    bg:"Black",
    noWordBreak:true,
  }
}
const commandHistoryAtom=atom<string[]>([]);
const currentPositionInCommandHistoryAtom=atom<number>(-1);
const Beanshell=({}):ReactElement=>{
  const[commandHistory,setCommandHistory]=useAtom(commandHistoryAtom);
  const[currentPositionInCommandHistory,setCurrentPositionInCommandHistory]=useAtom(currentPositionInCommandHistoryAtom);
  useEffect(()=>{console.table(commandHistory);},[commandHistory]);
  useEffect(()=>{
    console.log(currentPositionInCommandHistory,commandHistory[currentPositionInCommandHistory],commandHistory);
  },[currentPositionInCommandHistory]);
  const[OhMyBshStatus,setOhMyBshStatus]=useState<boolean>(true);
  const[OhMyBshDir,setOhMyBshDir]=useState<string>("~");
  const inputRef=useRef<HTMLDivElement>(null);
  const[logs,setLogs]=useState<(BeanshellLogs|ReactElement)[]>([
    //?test code
    // {t:"l",m:"Hello World"},
    // {t:"l",m:{c:"Hello World Styled 1",clr:"Cyan",bg:"DarkCyan"}},
    // {t:"nl",},
    // {t:"l",m:[
    //   {c:"Hello World Styled 2",clr:"Red",bg:"DarkRed"},
    //   {c:" Hello World Styled 3",clr:"Green",bg:"DarkGreen"}
    // ],clr:"Green",bg:"DarkGreen"},
    {t:"l",m:"Beansite Beanshell "+import.meta.env.VITE_BEANSHELL_VERSION},
    {t:"l",m:"Copyright (c) M1dnight. All rights reserved."},
    {t:"nl",},
    {t:"nf",m:"fa-warning",clr:"BrightYellow",bg:"DarkYellow"},
    {t:"l",m:{c:"Beanshell is a work in progress.",clr:"BrightYellow",bg:"DarkYellow"}},
    {t:"l",m:[
      {c:"Please report any bugs or issues to the Beansite Discord.",clr:"BrightYellow",bg:"DarkYellow"}
    ]},
    {t:"nl",},
  ]);
  const NerdFontIcon=({name}:{name:string}):ReactElement=>(<span className={`nf nf-${name}`}/>);
  const Log=({data}:{data:BeanshellLogs}):ReactElement=>{
    const LogBase=({data2}:{data2:BeanshellLogs}):ReactElement=>{
      return(<motion.span 
        className={`
          bshl 
          clr${data2.clr||"White"} 
          bg${data2.bg||"Transparent"} 
          ${data2.noWordBreak?"noWordBreak":""}`.replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, ' ').trim()} 
        style={{
          fontStyle:data2.i?"italic":"normal",
          fontWeight:data2.b?"bold":"normal",
          textDecoration:data2.u?"underline":"none",
          ...data2.customStyling,
        }}>{data2.m as string}</motion.span>);
    };
    return(<>
      {typeof data.m==="string"?<LogBase data2={data}/>
      :Array.isArray(data.m)?<>{data.m.map((item,idx)=>(
        <LogBase key={generateId(8)+idx} data2={{
          m:item.c as string,
          t:data.t,
          clr:item.clr||data.clr,
          bg:item.bg||data.bg,
          i:item.i??data.i,
          b:item.b??data.b,
          u:item.u??data.u 
        }} />
      ))}</>:(typeof data.m==="object"&&data.m!==null)?<LogBase data2={{
        m:(data.m as BeanshellStyledText).c as string,
        t:data.t,
        clr:(data.m as BeanshellStyledText).clr||data.clr,
        bg:(data.m as BeanshellStyledText).bg||data.bg,
        i:(data.m as BeanshellStyledText).i??data.i,
        b:(data.m as BeanshellStyledText).b??data.b,
        u:(data.m as BeanshellStyledText).u??data.u
      }}/>
      :null}
      {(!Object.hasOwn(data,'includeNewline')||data.includeNewline)
        ?<br/>
        :null}
    </>);
  };
  const[FileSystem,setFileSystem]=useAtom(FileSystemAtom);
  useEffect(()=>{console.log("FileSystem:",FileSystem);},[FileSystem]);
  const[,setFileProperty]=useAtom(FilePropertyModifierAtom);
  const[,createFile]=useAtom(FileCreatorAtom);
  const[directoryTree,setDirectoryTree]=useState<string[]>([]);
  const getScope=():DirectoryBase=>{
    var scope:DirectoryBase=FileSystem;
    for(const dir of directoryTree){
      if(scope[dir]&&scope[dir].isDirectory)scope=(scope[dir] as Directory).children;
    }
    return scope;
  };
  const Nano=({
    file,
    fileName,
    fileKey,
    creating,
    currentDirectoryTree
  }:{
    file:string;
    fileName:string;
    fileKey:string;
    creating:boolean;
    currentDirectoryTree: string[];
  }):ReactElement=>{
    const nanoRef=useRef<HTMLDivElement>(null);
    useEffect(()=>{setTimeout(()=>nanoRef?.current?.focus(),0);},[]);
    function saveFile(){
      // export file to local machine
      // const a=document.createElement("a");
      // const file=new Blob([nanoRef?.current?.innerText||""],{type:"text/plain"});
      // a.href=URL.createObjectURL(file);
      // a.download="nano_export.txt";
      // a.click();
      // URL.revokeObjectURL(a.href);
      // a.remove();
      if(!creating)
        setFileProperty([
          currentDirectoryTree,
          fileKey,
          "content",
          nanoRef?.current?.innerText||""
        ]);
      else{
        createFile([
          currentDirectoryTree,
          fileKey||"newfile.txt",
          {
            name:fileName||"newfile",
            id:generateId(10),
            isDirectory:false,
            type:fileKey.split(".").pop()||"txt",
            content:nanoRef?.current?.innerText||"",
          }
        ]);
      }
      setTimeout(()=>nanoRef?.current?.focus(),0);
    }
    return(<div className="bgDarkBlue" style={{
      position:"absolute",
      height: "100%",
      top:"50%",
      left:"50%",
      transform:"translate(-50%,-50%)",
      width:"100%",
      zIndex:9999,
    }}>
      <motion.div style={{
        width:"100%",
        height:"1rem",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        position:"relative",
      }} className="bshl clrDarkBlue bgBrightGray">
        <motion.span>  BS nano 0.1.0</motion.span>
        <motion.span style={{
          position:"absolute",
          left:"50%",
          transform:"translateX(-50%)",
        }}>File: {fileName||"new file"}</motion.span>
        <motion.span>Modified  </motion.span>
      </motion.div>
      <motion.div
        style={{
          height:"calc(100% - 1rem - 3rem)",
          width:"100%",
          overflowY:"auto",
          overflowX:"hidden",
        }}
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
          }else if(e.key==='x'&&(e.ctrlKey||e.metaKey)){
            e.preventDefault();
            console.log("ctrl+x pressed => exiting nano");
            setLogs([]);
            setTimeout(()=>inputRef?.current?.focus(),0);
          }else if(e.key==='o'&&(e.ctrlKey||e.metaKey)){
            e.preventDefault();
            console.log("ctrl+o pressed => saving file");
            saveFile();
          }
        }}
        spellCheck="false" 
        autoCorrect="off" 
        autoCapitalize="off" 
        contentEditable
        ref={nanoRef}
        className="bshl input">{file||""}</motion.div>
      <motion.div style={{
        width:"100%",
      }} className="bshl">
        <motion.span className="clrDarkBlue bgBrightGray">^G</motion.span>
        <motion.span className="clrWhite"> Get Help  </motion.span>
        <motion.span className="clrDarkBlue bgBrightGray">^O</motion.span>
        <motion.span className="clrWhite"> Write Out </motion.span>
        <motion.span className="clrDarkBlue bgBrightGray">^W</motion.span>
        <motion.span className="clrWhite"> Where Is  </motion.span>
        <motion.span className="clrDarkBlue bgBrightGray">^K</motion.span>
        <motion.span className="clrWhite"> Cut Text  </motion.span>
        <motion.span className="clrDarkBlue bgBrightGray">^J</motion.span>
        <motion.span className="clrWhite"> Justify   </motion.span>
        <motion.span className="clrDarkBlue bgBrightGray">^X</motion.span>
        <motion.span className="clrWhite"> Exit      </motion.span>
        <motion.span className="clrDarkBlue bgBrightGray">^R</motion.span>
        <motion.span className="clrWhite"> Read File </motion.span>
        <motion.span className="clrDarkBlue bgBrightGray">^\</motion.span>
        <motion.span className="clrWhite"> Replace   </motion.span>
        <motion.span className="clrDarkBlue bgBrightGray">^U</motion.span>
        <motion.span className="clrWhite"> Paste Text</motion.span>
        <motion.span className="clrDarkBlue bgBrightGray">^T</motion.span>
        <motion.span className="clrWhite"> To Spell  </motion.span>
      </motion.div>
    </div>);
  };
  const[,setWindow]=useAtom(ExpressDerivedWinModifierAtom);
  const bshEval=(input:string):void=>{
    let inputTrimmed=input.trim();
    setCommandHistory(x=>[input,...x,]);
    const Header=
      <><motion.div className="bshl ohmybsh">
        <motion.span className="startBlock">  Admin </motion.span>
      </motion.div>&nbsp;&nbsp;&nbsp;
      <motion.div className="bshl input">{input}</motion.div><br/></>;
    if(inputTrimmed===""){setLogs(x=>[...x,Header]);}
    else{
      //setLogs(x=>[...x,Header]);
      let inputArray=inputTrimmed.split(" ");
      switch(inputArray[0]){
        case "help":
          setLogs(x=>[...x,Header,
            {t:"l",m:"Avaliable Commands",b:true,u:true},
            {t:"l",m:"    help - Display this help message"},
            {t:"l",m:"    clear (alias: cls) - Clear the screen"},
            {t:"l",m:"    echo --clr?=<color> --bg?=<color> <message> - Display a message with optional color and background"},
            {t:"l",m:"    exit (alias: quit) - Exit the Beanshell"},
            {t:"l",m:"    nano - Open the nano text editor"},
            {t:"l",m:"    dir (alias: ls) - List directory contents"},
            {t:"l",m:"    cd <directory> - Change directory"},
            {t:"nl",}
          ]);
        break;
        case "mkdir":
          if(inputArray.length<2){
            setLogs(x=>[...x,Header,{t:"l",m:"mkdir : missing argument",...stylePresets.error}]);
            break;}
          setLogs(x=>[...x,Header,]);
          createFile([
            directoryTree,
            inputArray[1],
            {
              name:inputArray[1],
              id:generateId(10),
              isDirectory:true,
              // @ts-expect-error
              children:{},
            }
          ]);  
        break;
        case "cls":case "clear":setLogs([]);break;
        case "dir":case "ls":
          var scope:DirectoryBase=getScope();
          console.table(scope);
          setLogs(x=>[...x,Header,{t:"nl"},
            {t:"l",m:[
              {c:"    "},{c:"Directory: B:/"+directoryTree.join("/")+(directoryTree.length>0?"/":""),}
            ]},{t:"nl"},
            {t:"l",m:"Mode".padEnd(8," ")+"Name",clr:"Green"},
            {t:"l",m:"----".padEnd(8," ")+"----",clr:"Green"},
            ...Object.keys(scope).filter((key)=>scope[key].isDirectory).map((key):BeanshellLogs=>({
              t:"l",
              m:[
                {c:"d-r--".padEnd(8," ")},
                {c:(scope[key].name as string),bg:"BrightBlue"},
              ],
            })),
            ...Object.keys(scope).filter((key)=>!scope[key].isDirectory).map((key):BeanshellLogs=>({
              t:"l",
              m:[
                {c:"-a---".padEnd(8," ")},
                {c:`${(scope[key].name as string)}.${((scope[key] as File).type as string)}`,},
              ],
            }))
          ]);
        break;
        case "cd..":
          setLogs(x=>[...x,Header,]);
          if(directoryTree.length>0){
            setDirectoryTree(x=>x.slice(0,-1));
            setOhMyBshDir(x=>x.split("/").slice(0,-1).join("/")||"~");
          }
        break;
        case "cd":
          if(inputArray.length<2){setLogs(x=>[...x,Header,]);break;}
          var scope:DirectoryBase=getScope();
          if(inputArray[1]===".."){
            setLogs(x=>[...x,Header,]);
            if(directoryTree.length>0){
              setDirectoryTree(x=>x.slice(0,-1));
              setOhMyBshDir(x=>x.split("/").slice(0,-1).join("/")||"~");
            }
          }else if(scope[inputArray[1]]&&scope[inputArray[1]].isDirectory){
            setLogs(x=>[...x,Header,]);
            setOhMyBshDir(x=>x+"/"+inputArray[1]);
            setDirectoryTree(x=>[...x,inputArray[1]]);
          }else if(inputArray[1]==="~"){
            setLogs(x=>[...x,Header,]);
            setOhMyBshDir("~");
            setDirectoryTree([]);
          }else if(inputArray[1].includes("/")){
            let directoryArray=inputArray[1].split("/").filter((v)=>!!v);
            var scope:DirectoryBase=getScope();
            let res:boolean=true;
            for(const dir of directoryArray){
              if(scope[dir]&&scope[dir].isDirectory){
                scope=(scope[dir] as Directory).children;
              }else{
                res=false;
                setLogs(x=>[...x,Header,{
                  t:"l",
                  m:`Set-Location: Cannot find path '${"B:/"+directoryTree.join("/")+(directoryTree.length>0?"/":"")+inputArray[1]+"/"}' because it does not exist.`,
                  ...stylePresets.error
                }]);
                break;
              }
            }
            if(res){
              setLogs(x=>[...x,Header,])
              setDirectoryTree(x=>[...x,...directoryArray]);
              setOhMyBshDir(x=>x+"/"+directoryArray.join("/"));
            }
          }else{
            setLogs(x=>[...x,Header,{
              t:"l",
              m:`Set-Location: Cannot find path '${"B:/"+directoryTree.join("/")+(directoryTree.length>0?"/":"")+inputArray[1]+"/"}' because it does not exist.`,
              ...stylePresets.error
            }]);
          }
        break;
        case "echo":
          if(inputArray.length<2){
            setLogs(x=>[...x,Header,{t:"l",m:"echo : missing argument",...stylePresets.error}]);
            break;}
          let styleArgs:ColorTypes={};
          inputArray.slice(1).map((item,index)=>{
            if(item.startsWith('--')){
              switch(item.split('=')[0]){
                case "--clr":
                  styleArgs.clr=(item.split('=')[1] as Colors)??"White";
                  break;
                case "--bg":
                  styleArgs.bg=(item.split('=')[1] as Colors)??"Transparent";
                  break;
              }
            }
          });
          setLogs(x=>[...x,Header,{
            t:"l",
            m:inputArray.slice(1).filter((v)=>!v.startsWith('--')).join(" "),
            ...styleArgs
          }]);
        break;
        case "quit":case "exit":
          setLogs(x=>[...x,Header,{t:"l",m:"Exiting Beanshell..."}]);
          setTimeout(()=>{
            setLogs([]);
            setWindow([["beanshell","open",false]]);
          },1000);break;
        case "nano":
          if(inputArray.length<2){
            setLogs(x=>[...x,Header,{t:"l",m:"nano : missing argument",...stylePresets.error}]);
            break;}
          if(!/(.*)\.(.*)/.test(inputArray[1])){
            setLogs(x=>[...x,Header,{t:"l",m:"nano : invalid file name",...stylePresets.error}]);
            break;}
          var scope:DirectoryBase=getScope();
          if(scope[inputArray[1]]&&!scope[inputArray[1]].isDirectory)
            setLogs([<Nano 
              creating={false}
              currentDirectoryTree={directoryTree}
              file={(scope[inputArray[1]] as File).content}
              fileKey={inputArray[1]}
              fileName={(scope[inputArray[1]] as File).name}/>]);
          else setLogs([<Nano
            creating={true}
            currentDirectoryTree={directoryTree}
            file=""
            fileKey={inputArray[1]}
            fileName={inputArray[1].split(".")[0]}
          />]);
          break;
        case "cat":
          if(inputArray.length<2){
            setLogs(x=>[...x,Header,{t:"l",m:"cat : missing argument",...stylePresets.error}]);
            break;}
          var scope:DirectoryBase=getScope();
          if(scope[inputArray[1]]&&!scope[inputArray[1]].isDirectory)
            setLogs(x=>[...x,Header,
              ...(scope[inputArray[1]] as File).content.split("\n")
                .map((line,)=>({t:"l",m:(line||"")} as BeanshellLogs)),
            ]);
          else setLogs(x=>[...x,Header,{t:"l",m:`cat : ${inputArray[1]} : No such file`,...stylePresets.error}]);
        break;
        case "tac":
          if(inputArray.length<2){
            setLogs(x=>[...x,Header,{t:"l",m:"cat : missing argument",...stylePresets.error}]);
            break;}
          var scope:DirectoryBase=getScope();
          if(scope[inputArray[1]]&&!scope[inputArray[1]].isDirectory)
            setLogs(x=>[...x,Header,
              ...(scope[inputArray[1]] as File).content.split("\n").reverse()
                .map((line,)=>({t:"l",m:(line||"")} as BeanshellLogs)),
            ]);
          else setLogs(x=>[...x,Header,{t:"l",m:`cat : ${inputArray[1]} : No such file`,...stylePresets.error}]);
        break;
        default:
          if(inputArray[0].endsWith(".exe")){
            setLogs(x=>[...x,Header]);
          }else{
            setLogs(x=>[...x,Header,
              {
                t:"l",
                m:`${inputArray[0]} : the term '${inputArray[0]}' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is correct and try again.`,
                ...stylePresets.error,
              },{
                t:"l",
                m:"At line:1 char:1",
                ...stylePresets.error,
              },{
                t:"l",
                m:`+ ${inputArray[0]}`,
                ...stylePresets.error,
              },{
                t:"l",
                m:`+ ${"~".repeat(inputArray[0].length)}`,
                ...stylePresets.error,
              },{
                t:"l",
                m:"    + CategoryInfo          : ObjectNotFound: (echo:String) [], CommandNotFoundException",
                ...stylePresets.error,
              },{
                t:"l",
                m:"    + FullyQualifiedErrorId : CommandNotFoundException",
                ...stylePresets.error,
              },
            ]);
          }
        break;
      }
    }
  }
  const Input=({}):ReactElement=>{
    return(<motion.div 
      spellCheck="false" 
      autoCorrect="off" 
      autoCapitalize="off" 
      className="bshl input"
      ref={inputRef}
      onKeyDown={(e)=>{
        // e.currentTarget.innerText=e.currentTarget.innerText.replace(/\n/g,"");
        if(e.key==="Enter"){
          e.preventDefault();
          bshEval(e.currentTarget.innerText);
          e.currentTarget.textContent="";
          setCurrentPositionInCommandHistory(-1);
        }else if(e.key==="ArrowUp"){
          e.preventDefault();
          e.stopPropagation();
          if(commandHistory[currentPositionInCommandHistory+1])
            setCurrentPositionInCommandHistory(currentPositionInCommandHistory+1);
        }else if(e.key==="ArrowDown"){
          e.preventDefault();
          e.stopPropagation();
          if(commandHistory[currentPositionInCommandHistory-1])
            setCurrentPositionInCommandHistory(currentPositionInCommandHistory-1);
          else setCurrentPositionInCommandHistory(-1);
        }
        setTimeout(()=>{
          inputRef.current?.focus();
          if(e.key==="ArrowDown"||e.key==="ArrowUp"){
            let range=document.createRange();
            let selection=window.getSelection();
            range.selectNodeContents(inputRef.current as Node);
            range.collapse(false);
            selection?.removeAllRanges();
            selection?.addRange(range);
          }
        },0);
      }}
      contentEditable>{commandHistory[currentPositionInCommandHistory]||""}</motion.div>);
  };
  return(<>
    <motion.div id="bsWrapper">
      {logs.map((log,index)=>
        isValidElement(log)?log:(log.t==="l"||log.t==="log")
          ?<Log key={generateId(10)} data={log}/>
        :(log.t==="nl"||log.t==="newline")?<br key={generateId(10)}/>
        :(log.t==="nf"||log.t==="NerdFontIcon")?<motion.span 
          key={generateId(10)}
          className={`bshl clr${log.clr||"White"} bg${log.bg||"Transparent"}`} 
          style={{
            fontStyle:log.i?"italic":"normal",
            textDecoration:log.u?"underline":"none",
          }}><NerdFontIcon name={log.m as string}/></motion.span>
        :null
      )}
      <motion.div className="bshl ohmybsh">
        <motion.span className="startBlock">  Admin </motion.span>
        <motion.span className="midBlock"> <NerdFontIcon name="cod-folder"/> {OhMyBshDir} </motion.span>
        <motion.span className={`endBlock ${OhMyBshStatus?"":"error"}`}> 
          &nbsp;<NerdFontIcon name={OhMyBshStatus?"fa-check":"oct-x"}/>&nbsp;
        </motion.span>
      </motion.div>&nbsp;
      <Input/><br/>
    </motion.div>
  </>);
};
export default Beanshell;