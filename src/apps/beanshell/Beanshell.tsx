import { useState, type ReactElement } from "react";
import "./style.scss";
import { motion } from "motion/react";
// type Abbreviated<T,M>={[K in keyof T as K|{[P in keyof M]:M[P]extends K?P:never}[keyof M]]:T[K];};
type Colors=
  "Black"|"Gray"|"White"|"BrightWhite"|
  "Blue"|"DarkBlue"|"BrightBlue"|
  "Green"|"DarkGreen"|"BrightGreen"|
  "Cyan"|"DarkCyan"|"BrightCyan"|
  "Red"|"DarkRed"|"BrightRed"|
  "Magenta"|"DarkMagenta"|"BrightMagenta"|
  "Yellow"|"DarkYellow"|"BrightYellow";
interface ColorTypes{
  /*color*/clr?:Colors;
  /*background*/bg?:Colors;
  /*italics*/i?:boolean;
  /*bold*/b?:boolean;
  /*underline*/u?:boolean;
};
interface BeanshellStyledText extends ColorTypes{/*contents*/c?:string;};
interface BeanshellLogs extends ColorTypes{
  /*message*/m:BeanshellStyledText|BeanshellStyledText[]|string;
  /*type*/t:"log"|"l"|"newline"|"nl";
};
const Beanshell=({}):ReactElement=>{
  const[logs,setLogs]=useState<BeanshellLogs[]>([
    {t:"l",m:"Hello World"},
    {t:"l",m:[
      {c:"Hello World 2",clr:"Red",bg:"DarkRed"},
      {c:" Hello World 3",}
    ],clr:"Green",bg:"DarkGreen"},
  ]);
  return(<><motion.div id="bsWrapper">

  </motion.div></>);
};
export default Beanshell;