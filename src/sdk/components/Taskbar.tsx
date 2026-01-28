import { useEffect, type ReactElement } from "react";
import "./styles/Taskbar.scss";
import { motion } from "motion/react";
import { useAtom } from "jotai";
import { DerivedWinAtom } from "../store";
export const Taskbar=({}):ReactElement=>{
  // @ts-ignore
  const[windows,setWindow]=useAtom(DerivedWinAtom);
  useEffect(()=>{
    console.table(windows);
  },[windows]);
  interface IAppItem {
    // key:string;
    id:string;
  }
  const AppItem=({id}:IAppItem):ReactElement=>{
    // useEffect(()=>{
    // indexing ref
      // windows[windows.findIndex((win)=>{return win.id===id;})]
    // },[]);
    return(<motion.div className="item">
      <motion.div
        style={{backgroundImage:`url(${windows[windows.findIndex((win)=>{return win.id===id;})].icon})`,}} 
        className="icon"></motion.div>
    </motion.div>);
  }
  return(<>
    <motion.div id="Taskbar">
      <motion.div className="Start item">
        <motion.div className="icon"></motion.div>
      </motion.div>
      {windows.map((win)=>{
        return(<AppItem key={win.id} id={win.id}/>);
      })}
    </motion.div>
  </>);
}