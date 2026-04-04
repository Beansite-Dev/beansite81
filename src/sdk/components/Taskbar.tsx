import { useEffect, useState, type ReactElement } from "react";
import "./styles/Taskbar.scss";
import { AnimatePresence, motion, Reorder } from "motion/react";
import { atom, useAtom } from "jotai";
import { DerivedWinModifierAtom, WinAtom } from "../store";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { StartMenu, startMenuAtom } from "./StartMenu";
import { useTime } from "react-timer-hook";
import { Dialog } from "./Dialog";
import Clock from "react-clock";
// import Calendar from "react-calendar";
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
export const DerivedTaskbarWinAtom=atom(
  (get)=>get(WinAtom).map(item=>item.id),
  // (get,set,update:IWinObj[])=>set(WinAtom,update),
);
// export const DerivedTaskbarItemWinAtom=atom(
//   (get)=>get(WinAtom),
//   (get,set,update:IWinObj[])=>set(WinAtom,uniqueById([...get(WinAtom),...update]))
// );
// https://www.npmjs.com/package/react-timer-hook
const TaskbarClock=({mb81ref}:{mb81ref:React.RefObject<HTMLDivElement>}):ReactElement=>{
  const{ 
    minutes,
    hours,
    ampm 
  }=useTime({format:'12-hour',interval:60});
  const date=new Date().toLocaleDateString();
  const[showDateDialog,setShowDateDialog]=useState<boolean>(false);
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
export const Taskbar=({mb81ref}:{mb81ref:React.RefObject<HTMLDivElement>}):ReactElement=>{
  //@ts-ignore
  const[windows,]=useAtom(DerivedTaskbarWinAtom);
  const[derivedTaskbarReorderWindows,sdtrw]=useState(windows);
  const[windows2,updateWindow]=useAtom(DerivedWinModifierAtom);
  useEffect(()=>{
    console.log(windows2.filter(i=>i.open).length,derivedTaskbarReorderWindows.length);
    if(windows2.filter(i=>i.open).length!==derivedTaskbarReorderWindows.length){
      sdtrw(windows);
    }
  },[windows]);
  // const windows=useAtomValue(selectAtom(DerivedTaskbarWinAtom,(v)=>v));
  const[startMenuOpen,setStartMenuOpen]=useAtom(startMenuAtom);
  interface IAppItem {
    // key:string;
    id:string;
    _key:number;
  }
  const AppItem=({id,_key}:IAppItem):ReactElement=>{
    useEffect(()=>{
      console.table(windows2);
    },[windows2]);
    // const setWindow=useSetAtom(DerivedTaskbarItemWinAtom);
    return(<><motion.div 
        initial={"closed"}
        animate={"open"}
        exit={"closed"}
        transition={{duration:.35}}
        onClick={(e)=>{
          e.preventDefault();
          updateWindow([id,"minimized",!windows2.filter(i=>i.id==id)[0].minimized]);
        }}
        className="item">
          <motion.div className="preview">
            
          </motion.div>
          <motion.div
            style={{backgroundImage:`url(${windows2[windows.findIndex((win)=>{return win===id;})].icon})`,}} 
            className="icon"></motion.div>
    </motion.div></>);
  }
  return(<>
    <StartMenu mb81ref={mb81ref} />
    <motion.div id="Taskbar">
      <motion.div 
        onClick={(e)=>{
          setStartMenuOpen(true);
        }}
        className="Start item">
          <motion.div className="icon"></motion.div>
      </motion.div>
      <AnimatePresence>
        <Reorder.Group className="rgroup" axis="x" as="div" values={derivedTaskbarReorderWindows} onReorder={sdtrw}>
          {derivedTaskbarReorderWindows.map((item,i)=>
            windows2.filter(i=>i.id==item)[0].open&&
              <Reorder.Item className="ritem" as="div" key={item} value={item}>
                <AppItem key={i} _key={i} id={item}/>
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