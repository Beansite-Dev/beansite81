import React, { Children, cloneElement, useRef, type ReactElement, type Ref, type RefObject } from "react";
import { Window, WinDragToMax } from "./components/Window";
import { motion } from "motion/react";
import "./Global.scss";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Taskbar } from "./components/Taskbar";
import { useAtom } from "jotai";
import { DerivedSetttingsAtom } from "./store";
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
  const mb81ref=useRef<any>(null);
  const[settings,]=useAtom(DerivedSetttingsAtom);
  return(<>
    <ErrorBoundary>
      <motion.div ref={mb81ref} id="Beansite81" className={`Beansite81 ${settings.theme} font-${settings.font}`}>
        <motion.div id="Background"></motion.div>
        <WinDragToMax />
        <motion.div id="WindowWrapper" ref={WindowWrapper}>
          {renderChildren()}
          {/* {children} */}
        </motion.div>
        <Taskbar mb81ref={mb81ref}/>
      </motion.div>
    </ErrorBoundary>
  </>);
}
export { Window };