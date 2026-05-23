import { isValidElement, useRef, useState, type ReactElement } from "react";
import "./style.scss";
import { motion } from "motion/react";
import { generateId } from "../../sdk/Lib";
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
};
const Beanshell=({}):ReactElement=>{
  const[commandHistory,setCommandHistory]=useState<string[]>([]);
  const[currentPositionInCommandHistory,setCurrentPositionInCommandHistory]=useState<number>(-1);
  const[OhMyBshStatus,setOhMyBshStatus]=useState<boolean>(true);
  const[OhMyBshDir,setOhMyBshDir]=useState<string>("~");
  const inputRef=useRef<HTMLDivElement>(null);
  const[logs,setLogs]=useState<(BeanshellLogs|ReactElement)[]>([
    //?test code
    // {t:"l",m:"Hello World"},
    // {t:"l",m:{c:"Hello World Styled 1",clr:"Cyan",bg:"DarkCyan"}},
    // {t:"nl",},
    // {t:"l",m:[
      // {c:"Hello World Styled 2",clr:"Red",bg:"DarkRed"},
      // {c:" Hello World Styled 3",clr:"Green",bg:"DarkGreen"}
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
      return(<motion.span className={`bshl clr${data2.clr||"White"} bg${data2.bg||"Transparent"}`} style={{
        fontStyle:data2.i?"italic":"normal",
        fontWeight:data2.b?"bold":"normal",
      }}>{data2.m as string}</motion.span>)
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
  const bshEval=(input:string):void=>{
    let inputTrimmed=input.trim();
    const Header=
      <><motion.div className="bshl ohmybsh">
        <motion.span className="startBlock">  Admin </motion.span>
      </motion.div>&nbsp;&nbsp;&nbsp;
      <motion.div className="bshl input">{input}</motion.div><br/></>;
    if(inputTrimmed===""){setLogs(x=>[...x,Header]);}
    else{setLogs(x=>[...x,Header]);
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
          e.currentTarget.innerText="";
          setTimeout(()=>{inputRef.current?.focus();},0);
        }
      }}
      contentEditable></motion.div>);
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
          fontWeight:log.b?"bold":"normal",
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