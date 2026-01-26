import { useEffect, type ReactElement } from "react";
import "./styles/Taskbar.scss";
import { isMotionComponent, motion } from "motion/react";
import { useAtom } from "jotai";
import type React from "react";
import { WinAtom } from "../store";
export const Taskbar=({}):ReactElement=>{
  const[windows,setWindow]=useAtom(WinAtom);
  useEffect(()=>{
    console.table(windows);
  },[windows]);
  return(<>
    <motion.div id="Taskbar">
      
    </motion.div>
  </>);
}