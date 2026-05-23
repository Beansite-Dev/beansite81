import { isValidElement, useEffect, useRef, useState, type ReactElement } from "react";
import "./style.scss";
import { motion } from "motion/react";
import { generateId } from "../../sdk/Lib";
import { ExpressDerivedWinModifierAtom } from "../../sdk/store";
import { atom, useAtom } from "jotai";
// type Abbreviated<T,M>={[K in keyof T as K|{[P in keyof M]:M[P]extends K?P:never}[keyof M]]:T[K];};
type Colors=
  "Black"|"Gray"|"White"|"BrightWhite"|
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
          ${data2.noWordBreak?"noWordBreak":""}`.trim()} 
        style={{
          fontStyle:data2.i?"italic":"normal",
          fontWeight:data2.b?"bold":"normal",
          textDecoration:data2.u?"underline":"none",
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
            {t:"nl",}
          ]);
          break;
        case "cls":
        case "clear":
          setLogs([]);
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
        case "quit":
        case "exit":
          setLogs(x=>[...x,Header,{t:"l",m:"Exiting Beanshell..."}]);
          setTimeout(()=>{
            setLogs([]);
            setWindow([["beanshell","open",false]]);
          },1000);
          break;
        default:
          
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
          let range=document.createRange();
          let selection=window.getSelection();
          range.selectNodeContents(inputRef.current as Node);
          range.collapse(false);
          selection?.removeAllRanges();
          selection?.addRange(range);
        },0);
      }}
      contentEditable>{commandHistory[currentPositionInCommandHistory]||""}</motion.div>);
  };
  return(<><motion.div id="bsWrapper">
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
      <motion.span className="midBlock"> <NerdFontIcon name="cod-folder"/>{OhMyBshDir} </motion.span>
      <motion.span className={`endBlock ${OhMyBshStatus?"":"error"}`}> 
        &nbsp;<NerdFontIcon name={OhMyBshStatus?"fa-check":"oct-x"}/>&nbsp;
      </motion.span>
    </motion.div>&nbsp;
    <Input/><br/>
  </motion.div></>);
};
export default Beanshell;