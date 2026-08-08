import { atom, useAtom } from "jotai";
// @ts-ignore
import React, { Children, cloneElement, isValidElement, Suspense, useEffect, useRef, useState, type ComponentType, type CSSProperties, type ReactElement, type ReactNode } from "react";
import { DerivedWinAtom, DerivedWinModifierAtom, ExpressDerivedWinModifierAtom, type IWinObj } from "../store";
// @ts-ignore
import { isMotionComponent, motion, AnimatePresence, easeInOut } from "motion/react";
import { generateId } from "../Lib";
import "./styles/Window.scss";
import { Rnd } from "react-rnd";
import { Icons, WindowSymbols, type IIcons } from "./Enum";
export const wdtmAtom=atom<boolean>(false);
const debug=false; //toggle for verbose window logging
export interface IWindow{
  children?:ReactNode;
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
  // darkIcon?:boolean;
  closed?:boolean|null;
  includeButton?:[boolean,boolean,boolean];
  customContentBoxStyling?:CSSProperties;
  CustomLoadingScreen?:ComponentType;
};
const variants={
  open:{
    opacity: 1,
    y:0,
    scale: "100%",
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
  customContentBoxStyling={},
  // @ts-ignore
  minimized=false,
  // darkIcon=false,
  closed=false,
  CustomLoadingScreen=LoadingScreen,
  includeButton=[true,true,true],
}:IWindow):ReactElement=>{
  const[_windows,setWindow]=useAtom(DerivedWinAtom);
  const[,updateWindow]=useAtom(DerivedWinModifierAtom);
  const[,updateWindow2]=useAtom(ExpressDerivedWinModifierAtom);
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
  const uuidRef=useRef(generateId(10));
  const uuid=uuidRef.current;
  const ids=`${id}_${uuid}`;
  const MoveWinToTop=()=>{
    const self=_windows.find(x=>x.id==id);
    if(self&&!self.focused){
      let not:string[]=[];
      document.querySelectorAll(".winRnd").forEach(x=>{
        if(x.id!==`${ids}_rnd`){
          (x as HTMLElement).style.zIndex="-1";
          not.push((x as HTMLElement).dataset.id as string);
        }
        else{
          (x as HTMLElement).style.zIndex="10";
        }
      });
      let toChange=[
        ...(not.map(x=>[x,"focused",false]) as [string,keyof IWinObj,any]),
        [id,"focused",true],
      ];
      // if(debug)console.warn(toChange);
      updateWindow2(toChange as [string,keyof IWinObj,any][]);
    }
  };
  useEffect(()=>{
    if(debug)console.log(`win-${id}loaded`);
    setWindow([{
      title,
      uuid, 
      id:id,
      focused:false,
      icon:(icon as string),
      open: !closed,
      minimized:!!minimized,
    }]);
  },[]);
  // close/minimize scripts
  useEffect(()=>{
    const winObj=_windows.find(x=>x.id==id);
    if(winObj){
      if(debug)console.log(winObj);
      if(isMin!==winObj.minimized||isOpen!==winObj.open){
        setIsMin(winObj.minimized);
        setIsOpen(winObj.open);
        if(!isMin||isOpen){MoveWinToTop();}
      }
    }
  },[_windows]);
  // logging state updates
  useEffect(()=>{if(debug)console.log(`min: ${isMin} - ${!(!isOpen||isMin)}`);},[isMin]);
  useEffect(()=>{if(debug)console.log(`open: ${isOpen} - ${!(!isOpen||isMin)}`);},[isOpen]);
  useEffect(()=>{if(debug)console.log(isResizing);},[isResizing]);
  // maximize scripts
  useEffect(()=>{
    if(debug)console.log(isMax);
    const onResize=()=>{if(isMax)setDim({x:0,y:0,height:innerHeight-40,width:innerWidth,});};
    window.addEventListener("resize",onResize);
    if(rndRef.current){
      if(isMax){
        MoveWinToTop();
        const rect=rndRef.current.getSelfElement().getBoundingClientRect();
        setLastPos({x:rect.x,y:rect.y});
        setLastDim({height:rect.height,width:rect.width});
        if(debug)console.table({x:rect.x,y:rect.y});
        setDim({x:0,y:0,height:innerHeight-40,width:innerWidth,});
      }else if(lastPos&&lastDim){
        rndRef.current.updatePosition(lastPos);
        rndRef.current.updateSize(lastDim);
        setDim({x:lastPos.x,y:lastPos.y,height:lastDim.height,width:lastDim.width,});
      }
    }
    return()=>window.removeEventListener("resize",onResize);
  },[isMax]);
  //🗙︎🗕🗖︎🗗︎
  const contentRef=useRef<any>(null);
  const renderChildren=()=>{
    return Children.map(children,(child)=>{
      if(isValidElement(child)){
        // console.log(child);
        if(["div"].includes((child as ReactElement).type as any))return child;
        else return cloneElement(child as ReactElement<any>,{contentRef,rndRef});
      }
    });
  };
  return(<>
    <Rnd
      ref={rndRef}
      disableDragging={isMax}
      enableResizing={!isMax}
      className="winRnd"
      data-id={id}
      data-max={isMax}
      data-min={isMin}
      data-open={isOpen}
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
        if(debug)console.log(`detected mousedown ${ids}`);
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
      bounds={bounds?.current}
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
            className={`Window ${isResizing?"noAni":""} win${id}`} 
            data-max={isMax}
            data-min={isMin}
            data-open={isOpen}
            layout
            id={ids}>
              <motion.div 
                className={`WindowDragHandle`}>
                  <motion.div className="Icon" style={{
                    backgroundImage:`url(${icon as string})`,
                    // ...(darkIcon?{invert:"100%"}:{}),
                  }}></motion.div>
                  <motion.h1  
                    ref={dragRef}
                    onMouseUp={(_e)=>{setWindowDragToMax(false);}}
                    onMouseDown={(e)=>{
                      if(isMax){
                        if(dragRef.current&&lastPos){
                          const dRect=dragRef.current.getBoundingClientRect();
                          setLastPos({
                            x:e.clientX-(dRect.left),
                            y:e.clientY-(dRect.top),
                          });
                          setIsMax(false);
                        }
                      }else setWindowDragToMax(true);
                    }}
                    className={`Title ${id}_draghandle`}>{title}</motion.h1>
                  <motion.div className="ButtonWrapper">
                    <motion.button 
                      style={includeButton[0]?{}:{display:"none"}}
                      onClick={(e)=>{
                        e.preventDefault();
                        if(debug)console.log("~ close");
                        updateWindow([id,"open",false]);
                      }}
                      className="Button x">{WindowSymbols.close}</motion.button>
                    <motion.button 
                      style={includeButton[1]?{}:{display:"none"}}
                      onClick={(e)=>{
                        e.preventDefault();
                        setIsMax(!isMax);
                        if(debug)console.log("~ max");
                      }}
                      id={`${id}_max`}
                      className="Button max">{isMax?WindowSymbols.unmax:WindowSymbols.max}</motion.button>
                    <motion.button 
                      style={includeButton[2]?{}:{display:"none"}}
                      onClick={(e)=>{
                        e.preventDefault();
                        if(debug)console.log("~ min");
                        updateWindow([id,"minimized",true]);
                      }}
                      className="Button min">{WindowSymbols.min}</motion.button>
                  </motion.div>
              </motion.div>
              <motion.div className="WinContents" ref={contentRef} style={customContentBoxStyling}>
                <Suspense fallback={<CustomLoadingScreen/>}>
                  {!(!isOpen||isMin)?renderChildren():null}
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
    if(debug)console.log(`wdtm status: ${windowDragToMax}`);
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