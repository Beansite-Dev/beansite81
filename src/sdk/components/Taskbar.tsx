import { useEffect, type ReactElement } from "react";
import "./styles/Taskbar.scss";
import { AnimatePresence, motion } from "motion/react";
import { atom, useAtom } from "jotai";
import { DerivedWinAtom } from "../store";
const startMenuAtom=atom<boolean>(false);
export const Taskbar=({}):ReactElement=>{
  // @ts-ignore
  const[windows,setWindow]=useAtom(DerivedWinAtom);
  const[startMenuOpen,setStartMenuOpen]=useAtom(startMenuAtom);
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
    return(<>{windows[windows.findIndex((win)=>{return win.id===id;})].open
      &&<motion.div 
        onClick={(e)=>{
          e.preventDefault();
        }}
        className="item">
          <motion.div
            style={{backgroundImage:`url(${windows[windows.findIndex((win)=>{return win.id===id;})].icon})`,}} 
            className="icon"></motion.div>
    </motion.div>}</>);
  }
  return(<>
    <motion.div id="Taskbar">
      <motion.div className="Start item">
        <motion.div className="icon"></motion.div>
      </motion.div>
      <AnimatePresence>
        {windows.map((win)=>{
          return(<AppItem key={win.id} id={win.id}/>);
        })}
      </AnimatePresence>
    </motion.div>
  </>);
}