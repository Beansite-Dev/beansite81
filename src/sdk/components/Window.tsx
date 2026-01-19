import { useAtom } from "jotai";
import React, { Children, useEffect, type ReactElement } from "react";
import { WinAtom } from "../store";
import { motion } from "motion/react";
import { generateId } from "../Lib";
import "./styles/Window.scss";
import { Rnd } from "react-rnd";
import { Icons } from "./Enum";
export interface IWindow{
  children:ReactElement;
  title:string;
  id:string;
  bounds?:any;
  icon:keyof typeof Icons;
  x:number,
  y:number,
  width:number,
  height:number,
  minHeight:number,
  minWidth:number,
};
export const Window=({
  children,
  title,
  id,
  bounds,
  icon=Icons.configApplication,
  x=10,
  y=10,
  width=340,
  height=220,
  minHeight=100,
  minWidth=100
}:IWindow):ReactElement=>{
  const[window,setWindow]=useAtom(WinAtom);
  const uuid=generateId(10);
  const ids=`${id}_${uuid}`;
  useEffect(()=>{
    
  },[]);
  //🗙︎🗕🗖︎🗗︎
  return(<>
    <Rnd
      dragHandleClassName={`${id}_draghandle`}
      minWidth={minWidth}
      minHeight={minHeight}
      bounds={bounds.current}
      default={{x,y,width,height,}}>
        <motion.div className="Window" id={ids}>
          <motion.div className={`WindowDragHandle `} id={`${id}_draghandle`}>
            <motion.div className="Icon" style={{
              backgroundImage:`url(${icon})`,
            }}></motion.div>
            <motion.h1 className={`Title ${id}_draghandle`}>{title}</motion.h1>
            <motion.div className="ButtonWrapper">
              <motion.button 
                onClick={(e)=>{
                  e.preventDefault();
                  console.log("~ close");
                }}
                className="Button x">🗙︎</motion.button>
              <motion.button 
                onClick={(e)=>{
                  e.preventDefault();
                  console.log("~ max");

                }}
                className="Button max">🗖︎</motion.button>
              <motion.button 
                onClick={(e)=>{
                  e.preventDefault();
                  console.log("~ min");
                }}
                className="Button min">🗕</motion.button>
            </motion.div>
          </motion.div>
          <motion.div className="WinContents">
            {children}
          </motion.div>
        </motion.div>
    </Rnd>
  </>);
};