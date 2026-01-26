import { atom, useAtom } from "jotai";
// @ts-ignore
import React, { Children, useEffect, useRef, useState, type ReactElement } from "react";
import { DerivedWinAtom, uniqueById, WinAtom, type IWinObj } from "../store";
// @ts-ignore
import { isMotionComponent, motion } from "motion/react";
import { generateId } from "../Lib";
import "./styles/Window.scss";
import { Rnd } from "react-rnd";
import { Icons } from "./Enum";
const wdtmAtom=atom<boolean>(false);
export const WinDragToMax=():ReactElement|null=>{
  const[wdtm]=useAtom(wdtmAtom);
  const[isHover,setIsHover]=useState<boolean>(false);
  useEffect(()=>{
    console.log(`wdtm status: ${wdtm}`);
  },[wdtm]);
  useEffect(()=>{
    console.log(`wdtm hoverStatus: ${isHover}`);
  },[isHover]);
  return(wdtm&&false)?<>
    <motion.div 
      onMouseEnter={()=>{setIsHover(true);}}
      onMouseLeave={()=>{setIsHover(false);}}
      id="wdtmDetector"></motion.div>
    {isHover?<motion.div id="wdtmBox"></motion.div>:null}
  </>:null;
}
export interface IWindow{
  children?:ReactElement;
  title:string;
  id:string;
  bounds?:any;
  icon:keyof typeof Icons;
  x?:number;
  y?:number;
  width?:number;
  height?:number;
  minHeight?:number;
  minWidth?:number;
  maximized?:boolean;
  minimized?:boolean;
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
  minWidth=100,
  maximized=false,
  // @ts-ignore
  minimized=false,
}:IWindow):ReactElement=>{
  // @ts-ignore
  const[windows,setWindow]=useAtom(DerivedWinAtom);
  const[isMax,setIsMax]=useState<boolean>(maximized);
  const[lastPos,setLastPos]=useState<{x:number,y:number}|null>(null);
  const[lastDim,setLastDim]=useState<{height:number,width:number}|null>(null);
  // @ts-ignore
  const[wdtm,swdtm]=useAtom(wdtmAtom);
  const rndRef=useRef<any>(null);
  const dragRef=useRef<any>(null);
  // interface Ims{
    // height?:number|string;
    // width?:number|string;
    // top?:number|string;
    // left?:number|string;
  // }
  // const[ms,sms]=useState<Ims>({});
  // const [position,setPosition]=useState<{x:number,y:number}>({x:0,y:0});
  const uuid=generateId(10);
  const ids=`${id}_${uuid}`;
  useEffect(()=>{
    console.log(`win-${id}loaded`);
    // return setWindowUnique({
    //   title,
    //   uuid, 
    //   id:ids,
    //   icon,
    // });
    return setWindow({
      title,
      uuid, 
      id:ids,
      icon,
    });
  },[]);
  useEffect(()=>{
    console.log(isMax);
    // sms(isMax?{
    // }:{});
    if(rndRef.current){
      if(isMax){
        const rect=rndRef.current.getSelfElement().getBoundingClientRect();
        setLastPos({x:rect.x,y:rect.y});
        setLastDim({height:rect.height,width:rect.width});
        console.table({x:rect.x,y:rect.y});
        rndRef.current.getSelfElement().style.transition=".35s";
        rndRef.current.updateSize({
          width: innerWidth,
          height: innerHeight-48,
        });
        rndRef.current.updatePosition({
          x:0,
          y:0,
        });
        setTimeout(()=>{
          rndRef.current.getSelfElement().style.transition="0s";
        },360);
      }else{if(!lastPos||!lastDim)return;
        rndRef.current.getSelfElement().style.transition=".35s";
        rndRef.current.updatePosition(lastPos);
        rndRef.current.updateSize(lastDim);
        setTimeout(()=>{
          rndRef.current.getSelfElement().style.transition="0s";
        },360);
      }
    }
  },[isMax]);
  //🗙︎🗕🗖︎🗗︎
  return(<>
    <Rnd
      // style={ms}
      // position={position}
      // onDragStop={(e, d) => {
      //   setPosition({ x: d.x, y: d.y });
      // }}
      ref={rndRef}
      disableDragging={isMax}
      enableResizing={!isMax}
      className="winRnd"
      dragHandleClassName={`${id}_draghandle`}
      minWidth={minWidth}
      minHeight={minHeight}
      bounds={bounds.current}
      default={{x,y,width,height,}}>
        <motion.div className="Window" id={ids}>
          <motion.div 
            className={`WindowDragHandle `} 
            ref={dragRef}
            onMouseUp={(e)=>{
              // console.log("detected mouseup");
              swdtm(false);
              if(e.clientY<=24){
                // console.log("is in rad");
                setIsMax(true);
              }
            }}
            onMouseDown={(e)=>{
              if(isMax){
                if(dragRef.current&&lastPos){
                  const dRect=dragRef.current.getBoundingClientRect();
                  setLastPos({
                    x:e.clientX - (dRect.left),
                    y:e.clientY - (dRect.top),
                  });
                  setIsMax(false);
                }
              }else{
                swdtm(true);
              }
            }}
            id={`${id}_draghandle`}>
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
                    setIsMax(!isMax);
                    console.log("~ max");
                  }}
                  id={`${id}_max`}
                  className="Button max">{isMax?"🗗︎":"🗖︎"}</motion.button>
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