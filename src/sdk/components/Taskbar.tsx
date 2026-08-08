import { useEffect, useState, type ReactElement, useRef, useCallback } from "react";
import "./styles/Taskbar.scss";
import { AnimatePresence, motion, Reorder } from "motion/react";
import { atom, useAtom } from "jotai";
import { DerivedWinModifierAtom, WinAtom, type IWinObj } from "../store";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { StartMenu, startMenuAtom } from "./StartMenu";
import { useTime } from "react-timer-hook";
import { Dialog } from "./Dialog";
import Clock from "react-clock";
import { toSvg } from "html-to-image";
// import Calendar from "react-calendar";
const debug=false; //toggle for verbose taskbar logging
type ValuePiece=Date|null;
type Value=ValuePiece|[ValuePiece,ValuePiece];
export const DerivedTaskbarWinAtom=atom((get)=>get(WinAtom).map(item=>item.id),
  // (get,set,update:IWinObj[])=>set(WinAtom,update),
);
// export const DerivedTaskbarItemWinAtom=atom(
//   (get)=>get(WinAtom),
//   (get,set,update:IWinObj[])=>set(WinAtom,uniqueById([...get(WinAtom),...update]))
// );
// https://www.npmjs.com/package/react-timer-hook
interface LiveSvgPreviewProps{
  targetId:string;
  refreshInterval?:number;
}
interface Size{
  width:number;
  height:number;
}
const LiveSvgPreview=({
  targetId,
  refreshInterval=500,
}:LiveSvgPreviewProps)=>{
  const containerRef=useRef<HTMLDivElement>(null);
  const[svgUrl,setSvgUrl]=useState<string|null>(null);
  const[containerSize,setContainerSize]=useState<Size>({
    width:0,
    height:0,
  });
  const[targetSize,setTargetSize]=useState<Size>({
    width: 1,
    height: 1,
  });
  useEffect(()=>{
    const observer=new ResizeObserver(([entry])=>{
      const { width, height }=entry.contentRect;
      setContainerSize({
        width,
        height,
      });
    });
    if(containerRef.current)observer.observe(containerRef.current);
    return()=>observer.disconnect();
  },[]);
  const capture=useCallback(async()=>{
    const target=document.getElementById(targetId);
    if(!(target instanceof SVGSVGElement)||!containerRef.current)return;
    const rect=target.getBoundingClientRect();
    if(!rect.width||!rect.height)return;
    setTargetSize({
      width:rect.width,
      height:rect.height,
    });
    try{
      const clone=target.cloneNode(true) as SVGSVGElement;
      const width=target.viewBox.baseVal.width||target.clientWidth||rect.width;
      const height=target.viewBox.baseVal.height||target.clientHeight||rect.height;
      clone.setAttribute("width",String(width));
      clone.setAttribute("height",String(height));
      if(target.hasAttribute("viewBox"))clone.setAttribute("viewBox",target.getAttribute("viewBox")!);
      clone.style.background="transparent";
      clone.style.backgroundColor="transparent";
      const originalElements=[
        target,
        ...Array.from(target.querySelectorAll("*")),
      ];
      const clonedElements=[
        clone,
        ...Array.from(clone.querySelectorAll("*")),
      ];
      originalElements.forEach((original, index)=>{
        const cloned=clonedElements[index];
        if(!(cloned instanceof SVGElement)){
          return;
        }
        const computed=window.getComputedStyle(original);
        const properties=[
          "transform",
          "transform-origin",
          "transform-box",
          "opacity",
          "filter",
          "clip-path",
          "mask",
          "fill",
          "fill-opacity",
          "fill-rule",
          "stroke",
          "stroke-opacity",
          "stroke-width",
          "stroke-linecap",
          "stroke-linejoin",
          "stroke-miterlimit",
          "stroke-dasharray",
          "stroke-dashoffset",
          "paint-order",
          "visibility",
          "display",
          "isolation",
          "mix-blend-mode",
          "vector-effect",
        ];
        properties.forEach((property)=>{
          const value=computed.getPropertyValue(property);
          if(value)cloned.style.setProperty(property,value);
        });
      });
      clone.setAttribute(
        "xmlns",
        "http://www.w3.org/2000/svg",
      );
      clone.setAttribute(
        "xmlns:xlink",
        "http://www.w3.org/1999/xlink",
      );
      const serializer=new XMLSerializer();
      const svgString=serializer.serializeToString(clone);
      setSvgUrl((previousUrl)=>{
        if(previousUrl)URL.revokeObjectURL(previousUrl);
        return URL.createObjectURL(
          new Blob([svgString],{
            type: "image/svg+xml;charset=utf-8",
          }),
        );
      });
    }catch(err){console.error("SVG capture failed:", err);}
  },[targetId]);
  useEffect(()=>{
    capture();
    const id=setInterval(capture, refreshInterval);
    return()=>clearInterval(id);
  },[capture,refreshInterval]);
  useEffect(()=>{
    return()=>{if(svgUrl)URL.revokeObjectURL(svgUrl);};
  },[svgUrl]);
  const scale=
    targetSize.width>0&&targetSize.height>0
      ?Math.min(
        containerSize.width / targetSize.width,
        containerSize.height / targetSize.height,
      ):1;
  return(<div
    ref={containerRef}
    style={{
      flexGrow: 1,
      aspectRatio: "16 / 10",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}>{svgUrl&&(<img
      src={svgUrl}
      alt="live preview"
      style={{
        width: targetSize.width * scale,
        height: targetSize.height * scale,
        display: "block",
        flexShrink: 0,
      }}
    />)}</div>);
};
const DialogClock=({}):ReactElement=>{
  const[time,setTime]=useState(new Date());
  useEffect(()=>{
    const timer=setInterval(()=>{
      setTime(new Date());
    },1000);
    return()=>clearInterval(timer);
  },[]);
  return(<>
    <motion.div className="ClockPositionWrapper">
      <motion.div className="ClockWrapper">
        <Clock value={time}/>
      </motion.div>
    </motion.div>
  </>);
}
const DialogCalendar=({}):ReactElement=>{
  return(<motion.div>
    <DayPicker mode="single"/>
  </motion.div>);
}
const TaskbarClock=({mb81ref}:{mb81ref:React.RefObject<HTMLDivElement>}):ReactElement=>{
  const{ 
    minutes,
    hours,
    ampm 
  }=useTime({format:'12-hour',interval:60});
  const date=new Date().toLocaleDateString();
  const[showDateDialog,setShowDateDialog]=useState<boolean>(false);
  return(<>
    <Dialog
      display={showDateDialog}
      mb81ref={mb81ref}
      onClickOff={setShowDateDialog}
      position={{
        bottom: "45px",
        right: "5px"
      }}
      size={{h:"20rem",w:"30rem"}}>
        {/* @ts-ignore */}
        <motion.div id="DateDialogLRWrapper">
          <DialogCalendar/>
          <DialogClock/>
        </motion.div>
    </Dialog>
    <motion.div 
      onClick={(_e)=>{
        setShowDateDialog(true);
      }}
      id="DateWrapper">
        <motion.div id="time">
          {(hours===0?12:hours)}:{String(minutes).padStart(2,'0')} {ampm?.toUpperCase()}
        </motion.div>
        <motion.div id="date">
          {date}
        </motion.div>
    </motion.div>
  </>);
}
interface IAppItem{
  id:string;
  windows2:IWinObj[];
  updateWindow:(update:[string,keyof IWinObj,any])=>void;
}
const AppItem=({id,windows2,updateWindow}:IAppItem):ReactElement=>{
  const win=windows2.find(w=>w.id===id);
  if(debug)console.table(windows2);
  if(!win)return<></>;
  return(<><motion.div 
      initial={"closed"}
      animate={"open"}
      exit={"closed"}
      transition={{duration:.35}}
      onClick={(e)=>{
        e.preventDefault();
        updateWindow([id,"minimized",!win.minimized]);
      }}
      className={`item ${win.focused?"focused":""}`}>
        <motion.div className="preview">
          {/* <LiveSvgPreview targetId={`${win.id}_${win.uuid}_rnd`}/> */}
          <motion.h1>{win.title}</motion.h1>
        </motion.div>
        <motion.div
          style={{backgroundImage:`url(${win.icon})`,}} 
          className="icon"></motion.div>
  </motion.div></>);
}
export const Taskbar=({mb81ref}:{mb81ref:React.RefObject<HTMLDivElement>}):ReactElement=>{
  //@ts-ignore
  const[windows,]=useAtom(DerivedTaskbarWinAtom);
  const[derivedTaskbarReorderWindows,sdtrw]=useState(windows);
  const[windows2,updateWindow]=useAtom(DerivedWinModifierAtom);
  useEffect(()=>{
    const openIds=windows.filter(wid=>windows2.find(w=>w.id===wid)?.open);
    const sameIds=openIds.length===derivedTaskbarReorderWindows.length
      &&openIds.every(wid=>derivedTaskbarReorderWindows.includes(wid));
    if(!sameIds){
      if(debug)console.log(openIds.length,derivedTaskbarReorderWindows.length);
      sdtrw(prev=>{
        const kept=prev.filter(wid=>openIds.includes(wid));
        const added=openIds.filter(wid=>!kept.includes(wid));
        return[...kept,...added];
      });
    }
  },[windows,windows2]);
  const[,setStartMenuOpen]=useAtom(startMenuAtom);
  return(<>
    <StartMenu mb81ref={mb81ref} />
    <motion.div id="Taskbar">
      <motion.div 
        onClick={(e)=>{setStartMenuOpen(true);}}
        className="Start item">
          <motion.div className="icon"></motion.div>
      </motion.div>
      <AnimatePresence>
        <Reorder.Group className="rgroup" axis="x" as="div" values={derivedTaskbarReorderWindows} onReorder={sdtrw}>
          {derivedTaskbarReorderWindows.map((item)=>
            windows2.find(w=>w.id===item)?.open&&
              <Reorder.Item className="ritem" as="div" key={item} value={item}>
                <AppItem id={item} windows2={windows2} updateWindow={updateWindow}/>
              </Reorder.Item>
          )}
        </Reorder.Group>
        {/* {windows.map((win,i)=> */}
          {/* <AppItem key={i} _key={i} id={win}/> )} */}
      </AnimatePresence>
      <TaskbarClock mb81ref={mb81ref}/>
    </motion.div>
  </>);
}