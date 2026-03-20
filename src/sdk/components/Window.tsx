import { atom, useAtom } from "jotai";
// @ts-ignore
import React, { Children, Suspense, useEffect, useRef, useState, type ComponentType, type ReactElement } from "react";
import { DerivedWinAtom, DerivedWinModifierAtom, type IWinObj } from "../store";
// @ts-ignore
import { isMotionComponent, motion, AnimatePresence, easeInOut } from "motion/react";
import { generateId } from "../Lib";
import "./styles/Window.scss";
import { Rnd } from "react-rnd";
import { Icons, WindowSymbols, type IIcons } from "./Enum";
export const wdtmAtom=atom<boolean>(false);
export interface IWindow{
  children?:ReactElement[]|ReactElement;
  title:string;
  id:string;
  bounds?:any;
  icon:keyof IIcons;
  x?:number;
  y?:number;
  width?:number;
  height?:number;
  minHeight?:number;
  minWidth?:number;
  maximized?:boolean;
  minimized?:boolean|null;
  closed?:boolean|null;
  CustomLoadingScreen?:ComponentType;
};
const variants={
  open:{
    opacity: 1,
    y:0,
    scale: "100%",
    // transition: {
    //   duration: .25,
    //   staggerChildren: .25,
    //   ease: easeInOut,
    // }
  },
  closed:{
    opacity: 0,
    y:5,
    scale: "90%",
  },
}
const LoadingScreen=():ReactElement=>{
  return(<>
    <motion.div className="WinLS">
      <motion.h1>Loading</motion.h1>
    </motion.div>
  </>);
}
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
  closed=false,
  CustomLoadingScreen=LoadingScreen,
}:IWindow):ReactElement=>{
  const[_windows,setWindow]=useAtom(DerivedWinAtom);
  const[,updateWindow]=useAtom(DerivedWinModifierAtom);
  const[isMax,setIsMax]=useState<boolean>(maximized);
  const[isMin,setIsMin]=useState<boolean|null>(false);
  const[isOpen,setIsOpen]=useState<boolean|null>(true);
  const[lastPos,setLastPos]=useState<{x:number,y:number}|null>(null);
  const[lastDim,setLastDim]=useState<{height:number,width:number}|null>(null);
  const[dim,setDim]=useState<{height:number,width:number,x:number,y:number}>({width,height,x,y});
  const[isResizing,setIsResizing]=useState<boolean>(false);
  const[_windowDragToMax,setWindowDragToMax]=useAtom(wdtmAtom);
  const rndRef=useRef<any>(null);
  const dragRef=useRef<any>(null);
  const uuid=generateId(10); //Universally Unique Identifier
  const ids=`${id}_${uuid}`;
  const MoveWinToTop=()=>{
    document.querySelectorAll(".winRnd").forEach(x=>{
      if(x.id!==`${ids}_rnd`)(x as HTMLElement).style.zIndex="-1";
      else(x as HTMLElement).style.zIndex="10";
    });
  }
  useEffect(()=>{
    console.log(`win-${id}loaded`);
    return setWindow([{
      title,
      uuid, 
      id:id,
      icon:(icon as string),
      open: !closed,
      minimized: !!minimized,
    }]);
  },[]);
  // close/minimize scripts
  useEffect(()=>{
    console.log(_windows.filter(x=>x.id==id)[0]);
    if(_windows.filter(x=>x.id==id)[0]){
      let winObj:IWinObj=_windows.filter(x=>x.id==id)[0];
      // let winElm:HTMLElement=rndRef.current.getSelfElement();
      if(isMin!==winObj.minimized||isOpen!==winObj.open){
        setIsMin(winObj.minimized);
        setIsOpen(winObj.open);
        if(!isMin||isOpen){MoveWinToTop();}
      }
    }
  },[_windows]);
  // logging state updates
  useEffect(()=>{console.log(`min: ${isMin} - ${!(!isOpen||isMin)}`);},[isMin]);
  useEffect(()=>{console.log(`open: ${isOpen} - ${!(!isOpen||isMin)}`);},[isOpen]);
  useEffect(()=>console.log(isResizing),[isResizing]);
  // maximize scripts
  useEffect(()=>{
    console.log(isMax);
    if(rndRef.current){
      if(isMax){
        MoveWinToTop();
        const rect=rndRef.current.getSelfElement().getBoundingClientRect();
        setLastPos({x:rect.x,y:rect.y});
        setLastDim({height:rect.height,width:rect.width});
        console.table({x:rect.x,y:rect.y});
        setDim({x:0,y:0,height:innerHeight-40,width:innerWidth,});
      }else{if(!lastPos||!lastDim)return;
        rndRef.current.updatePosition(lastPos);
        rndRef.current.updateSize(lastDim);
        setDim({x:lastPos.x,y:lastPos.y,height:lastDim.height,width:lastDim.width,});
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
      // default={{x,y,width,height,}}
      size={{width:dim.width,height:dim.height}}
      position={{x:dim.x,y:dim.y}}
      onResize={(e,direction,ref,delta,position)=>{
        setDim({
          width:ref.offsetWidth,
          height:ref.offsetHeight,
          ...position,
        });
      }}
      onResizeStart={()=>setIsResizing(true)}
      onResizeStop={()=>setIsResizing(false)}
      onDragStop={(_e,d)=>{
        setDim((prev)=>({...prev,x:d.x,y:d.y}));
        if(d.y<=20)setIsMax(true);
      }}
      onMouseDown={(_e)=>{
        setWindowDragToMax(false);
        console.log(`detected mousedown ${ids}`);
        MoveWinToTop();
      }}
      onDrag={(_e,d)=>{
        if(d.y<=20)setWindowDragToMax(true);
        else setWindowDragToMax(false);
      }}
      id={`${ids}_rnd`}
      dragHandleClassName={`${id}_draghandle`}
      minWidth={minWidth}
      minHeight={minHeight}
      bounds={bounds.current}
      style={{pointerEvents:!(!isOpen||isMin)?"auto":"none"}}>
        <AnimatePresence>
          {!(!isOpen||isMin)?<motion.div 
            variants={variants}
            initial={"closed"}
            animate={"open"}
            style={{height:dim.height,width:dim.width}}
            exit={"closed"}
            key={0}
            transition={{duration:isResizing?0:.25,}}
            className={`Window ${isResizing?"noAni":""}`} 
            layout
            id={ids}>
              <motion.div 
                className={`WindowDragHandle`}>
                  <motion.div className="Icon" style={{
                    backgroundImage:`url(${icon as string})`,
                  }}></motion.div>
                  <motion.h1  
                    ref={dragRef}
                    onMouseUp={(_e)=>{setWindowDragToMax(false);}}
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
                      }else setWindowDragToMax(true);
                    }}
                    className={`Title ${id}_draghandle`}>{title}</motion.h1>
                  <motion.div className="ButtonWrapper">
                    <motion.button 
                      onClick={(e)=>{
                        e.preventDefault();
                        console.log("~ close");
                        updateWindow([id,"open",false]);
                      }}
                      className="Button x">{WindowSymbols.close}</motion.button>
                    <motion.button 
                      onClick={(e)=>{
                        e.preventDefault();
                        setIsMax(!isMax);
                        console.log("~ max");
                      }}
                      id={`${id}_max`}
                      className="Button max">{isMax?WindowSymbols.unmax:WindowSymbols.max}</motion.button>
                    <motion.button 
                      onClick={(e)=>{
                        e.preventDefault();
                        console.log("~ min");
                        updateWindow([id,"minimized",true]);
                      }}
                      className="Button min">{WindowSymbols.min}</motion.button>
                  </motion.div>
              </motion.div>
              <motion.div className="WinContents">
                <Suspense fallback={<CustomLoadingScreen/>}>
                  {!(!isOpen||isMin)?children:null}
                </Suspense>
              </motion.div>
          </motion.div>:null}
        </AnimatePresence>
    </Rnd>
  </>);
};
export const WinDragToMax=():ReactElement|null=>{
  const[windowDragToMax]=useAtom(wdtmAtom);
  useEffect(()=>{
    console.log(`wdtm status: ${windowDragToMax}`);
  },[windowDragToMax]);
  return(windowDragToMax)?<>
    <AnimatePresence>
      {windowDragToMax&&<motion.div 
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:.15}}
        key={1}
        id="wdtmBox"></motion.div>}
    </AnimatePresence>
  </>:null;
}