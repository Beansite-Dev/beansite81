import { useAtom } from "jotai";
import { useEffect, type ReactElement } from "react";
import { WinAtom } from "../store";
import { motion } from "motion/react";
import { generateId } from "../Lib";
export interface IWindow{
  title:string;
  id:string;
};
export const Window=({
  title,id
}:IWindow):ReactElement=>{
  const[window,setWindow]=useAtom(WinAtom);
  const uuid=generateId(10);
  const ids=`${id}_${btoa(title)}_${uuid}`;
  useEffect(()=>{

  },[]);
  return(<>
    <motion.div className="Window" id={ids}>

    </motion.div>
  </>);
};