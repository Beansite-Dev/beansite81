import React, { Children, cloneElement, useRef, type ReactElement } from "react";
import { Window, WinDragToMax } from "./components/Window";
import { motion } from "motion/react";
import "./Global.scss";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Taskbar } from "./components/Taskbar";
interface IBeansite81{
  children:any
};
export const Beansite81=({
  children
}:IBeansite81):ReactElement=>{
  const WindowWrapper=useRef(null);
  const renderChildren=()=>{
    return Children.map(children,(child:ReactElement|any)=>{
      if(child&&child.type){
        // console.log(child);
        if(["div"].includes(child.type))return child;
        else return cloneElement(child,{bounds:WindowWrapper});
      }
    });
  };
  return(<>
    <ErrorBoundary>
      <motion.div className="Beansite81 default font-segoe">
        <motion.div id="Background"></motion.div>
        {/* <WinDragToMax /> */}
        <motion.div id="WindowWrapper" ref={WindowWrapper}>
          {renderChildren()}
          {/* {children} */}
        </motion.div>
        <Taskbar/>
      </motion.div>
    </ErrorBoundary>
  </>);
}
export { Window };