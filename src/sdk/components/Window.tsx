import { atom, useAtom } from "jotai";
// @ts-ignore
import React, { Children, useEffect, useRef, useState, type ReactElement } from "react";
import { DerivedWinAtom } from "../store";
// @ts-ignore
import { isMotionComponent, motion, AnimatePresence } from "motion/react";
import { generateId } from "../Lib";
import "./styles/Window.scss";
import { Rnd } from "react-rnd";
import { Icons } from "./Enum";
const wdtmAtom=atom<boolean>(false);
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
  const[_windows,setWindow]=useAtom(DerivedWinAtom);
  const[isMax,setIsMax]=useState<boolean>(maximized);
  const[lastPos,setLastPos]=useState<{x:number,y:number}|null>(null);
  const[lastDim,setLastDim]=useState<{height:number,width:number}|null>(null);
  const[_wdtm,swdtm]=useAtom(wdtmAtom);
  const rndRef=useRef<any>(null);
  const dragRef=useRef<any>(null);
  const uuid=generateId(10);
  const ids=`${id}_${uuid}`;
  useEffect(()=>{
    console.log(`win-${id}loaded`);
    return setWindow([{
      title,
      uuid, 
      id:ids,
      icon,
      open:true,
      minimized
    }]);
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
          height: innerHeight-40,
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
      ref={rndRef}
      disableDragging={isMax}
      enableResizing={!isMax}
      className="winRnd"
      onMouseDown={(_e)=>{
        swdtm(false);
        console.log("detected mousedown");
        document.querySelectorAll(".winRnd").forEach(x=>{
          if(x.id!==`${ids}_rnd`)(x as HTMLElement).style.zIndex="-1";
          else(x as HTMLElement).style.zIndex="10";
        });
      }}
      onDrag={(_e,d)=>{
        if(d.y<=20) swdtm(true);
        else swdtm(false);
      }}
      onDragStop={(_e,d)=>{
        if(d.y<=20){
          setIsMax(true);
        }
      }}
      id={`${ids}_rnd`}
      dragHandleClassName={`${id}_draghandle`}
      minWidth={minWidth}
      minHeight={minHeight}
      bounds={bounds.current}
      default={{x,y,width,height,}}>
        <motion.div className="Window" id={ids}>
          <motion.div 
            className={`WindowDragHandle `}>
              <motion.div className="Icon" style={{
                backgroundImage:`url(${icon})`,
              }}></motion.div>
              <motion.h1  
                ref={dragRef}
                onMouseUp={(_e)=>{swdtm(false);}}
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
                className={`Title ${id}_draghandle`}>{title}</motion.h1>
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
                    rndRef.current.getSelfElement().style.transition=".35s";
                    rndRef.current.getSelfElement().style.opacity="0";
                    rndRef.current.getSelfElement().style.translate="0% 3.5%";
                    rndRef.current.getSelfElement().style.scale="90%";
                    setTimeout(()=>{
                      rndRef.current.getSelfElement().style.transition="0s";
                      rndRef.current.getSelfElement().style.display="none";
                    },360);
                    setWindow([{
                      title,
                      uuid, 
                      id:ids,
                      icon,
                      open:false,
                      minimized
                    }]);
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
export const WinDragToMax=():ReactElement|null=>{
  const[wdtm]=useAtom(wdtmAtom);
  useEffect(()=>{
    console.log(`wdtm status: ${wdtm}`);
  },[wdtm]);
  return(wdtm)?<>
    <AnimatePresence>
      {wdtm&&<motion.div 
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:.15}}
        key={1}
        id="wdtmBox"></motion.div>}
    </AnimatePresence>
  </>:null;
}