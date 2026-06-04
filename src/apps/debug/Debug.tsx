import { motion } from "motion/react";
import type { ReactElement } from "react";
import { ExpressDerivedWinModifierAtom } from "../../sdk/store";
import { useAtom } from "jotai";
import { Icons } from "../../sdk/components/Enum";
import "./style.scss";
const Debug=({}):ReactElement=>{
  const[,setWindow]=useAtom(ExpressDerivedWinModifierAtom);
  return(<>
    <motion.h1>Test Window</motion.h1>
    <motion.h2>Debug</motion.h2>
    <motion.p>Check game win</motion.p>
    <motion.input id="checkwin" type="text" />
    <motion.button
      onClick={()=>{
        const input=document.getElementById("checkwin");
        if(input)window.open(
          (input as HTMLInputElement).value,
          "TEST WINDOW - BEANSITE 81 GAMELOADER",
          "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=640,height=360,top=100,left=100");
      }}>Submit</motion.button><br/><br/>
    <motion.button
      onClick={()=>{
        setWindow([
          ["win1","open",true],
          ["win1","minimized",false],
          ["changelog","open",true],
          ["changelog","minimized",false],
          ["settings","open",true],
          ["settings","minimized",false],
          ["beanpowered","open",true],
          ["beanpowered","minimized",false],
          ["beanforged","open",true],
          ["beanforged","minimized",false],
          ["blog","open",true],
          ["blog","minimized",false],
          ["beanshell","open",true],
          ["beanshell","minimized",false],
          ["explorer","open",true],
          ["explorer","minimized",false],
          ["notepad","open",true],
          ["notepad","minimized",false],
        ]);
      }}>Open All Windows</motion.button>
    <motion.button
      onClick={()=>{
        setWindow([
          ["win1","open",false],
          ["changelog","open",false],
          ["settings","open",false],
          ["beanpowered","open",false],
          ["beanforged","open",false],
          ["blog","open",false],
          ["beanshell","open",false],
          ["explorer","open",false],
          ["notepad","open",false],
        ]);
      }}>Close All Windows</motion.button><br/>
    <motion.a href="/extwr">ExtWindowRenderer</motion.a>
    <motion.h2>Icons</motion.h2>
    <motion.div className="iconWrapper">
      {Object.keys(Icons).map((x,i)=><motion.div
        key={i}
        data-icon={x}
        style={{backgroundImage:`url(${Icons[x as keyof typeof Icons]})`}}
        className="icon"
        title={x}></motion.div>)}
    </motion.div>
  </>);
};
export default Debug;