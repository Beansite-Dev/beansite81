import type { Dispatch, ReactElement, SetStateAction } from "react";
import "./styles/Dialog.scss";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import { createPortal } from "react-dom";
interface IDialog {
  display:boolean;
  onClickOff:Dispatch<SetStateAction<boolean>>;
  position:{
    top?:number|string,
    left?:number|string,
    right?:number|string,
    bottom?:number|string,
  };
  size:{
    h:number|string,
    w:number|string,
  };
  mb81ref:React.RefObject<HTMLDivElement>;
  children?:ReactElement[];
}
const variants={
  open:{
    opacity: 1,
    y:0,
    scale: "100%",
    transition: {
      duration: .25,
      staggerChildren: .25,
      ease: easeInOut,
    }
  },
  closed:{
    opacity: 0,
    y:50,
    scale: "90%",
  },
}
export const Dialog=({
  children,
  onClickOff,
  display,
  position,
  size,
  mb81ref,
}:IDialog):ReactElement|null=>{
  return(<>{mb81ref.current?createPortal(<AnimatePresence>{display?<>
    <motion.div 
      onClick={()=>{
        onClickOff(false);
      }}
      variants={variants}
      initial={"closed"}
      animate={"open"}
      exit={"closed"}
      key={0}
      className="ClickoffDetector"></motion.div>
    <motion.div
      variants={variants}
      initial={"closed"}
      animate={"open"}
      exit={"closed"}
      style={{
        ...position,
        width:size.w,
        height:size.h
      }}
      key={1}
      className="Dialog">
        <motion.div className="ContentWrapper">
          {children}
        </motion.div>
    </motion.div>
  </>:null}</AnimatePresence>,mb81ref.current):null}</>);
}