import { useEffect, useMemo, useState, type CSSProperties, type ReactElement } from "react";
import "./styles/Taskbar.scss";
import { AnimatePresence, easeInOut, motion, stagger } from "motion/react";
import { atom, useAtom } from "jotai";
import { DerivedWinAtom, DerivedWinModifierAtom, uniqueById, WinAtom, type IWinObj } from "../store";
import { createPortal } from "react-dom";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type ISourceOptions,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { Icons } from "./Enum";
const startMenuAtom=atom<boolean>(false);
export const DerivedTaskbarWinAtom=atom(
  (get)=>get(WinAtom).map(item=>item.id),
);
// export const DerivedTaskbarItemWinAtom=atom(
//   (get)=>get(WinAtom),
//   (get,set,update:IWinObj[])=>set(WinAtom,uniqueById([...get(WinAtom),...update]))
// );
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
export const StartMenu=({mb81ref}:{mb81ref:React.RefObject<HTMLDivElement>}):ReactElement|null=>{
  const[startMenuOpen,setStartMenuOpen]=useAtom(startMenuAtom);
  useEffect(()=>{
    initParticlesEngine(async(engine)=>{
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  },[]);
  const options:ISourceOptions=useMemo(()=>({
    "particles": {
      "number": {
        "value": 137,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 20,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1.5,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    //   "detect_on": "canvas",
    //   "events": {
    //     "onhover": {
    //       "enable": true,
    //       "mode": "grab"
    //     },
    //     "onclick": {
    //       "enable": true,
    //       "mode": "push"
    //     },
    //     // "resize": true
    //   },
    //   "modes": {
    //     "grab": {
    //       "distance": 231.44200550588337,
    //       "line_linked": {
    //         "opacity": 1
    //       }
    //     },
    //     "bubble": {
    //       "distance": 400,
    //       "size": 40,
    //       "duration": 2,
    //       "opacity": 8,
    //       "speed": 3
    //     },
    //     "repulse": {
    //       "distance": 200,
    //       "duration": 0.4
    //     },
    //     "push": {
    //       "particles_nb": 4
    //     },
    //     "remove": {
    //       "particles_nb": 2
    //     }
    //   }
    // },
    "retina_detect": true
  }),[],);
  const [init,setInit]=useState(false);
  interface IStartMenuItem {
    name:string;
    icon?:string;
    background:string;
    renderIcon?:boolean;
    customCallback?:()=>void;
    target?:string;
    style?:CSSProperties;
  }
  const StartMenuItem=({
    name,
    icon,
    background,
    renderIcon=true,
    customCallback,
    target,
    style,
  }:IStartMenuItem):ReactElement=>{
    const[windows,updateWindow]=useAtom(DerivedWinModifierAtom);
    return(<>
      <motion.div 
        style={{
          ...style,
          background: background,
        }}
        onClick={(e)=>{
          e.preventDefault();
          setStartMenuOpen(false);
          if(target){
            updateWindow([target,"open",true]);
          }
        }} 
        className="startMenuItem">
          <motion.h1 className="Name">{name}</motion.h1>
          {renderIcon&&<motion.div 
            className="Icon" 
            style={{
              backgroundImage:`url(${icon})`
            }}></motion.div>}
      </motion.div>
    </>);
  };
  return(<>{mb81ref.current?createPortal(<><AnimatePresence>
      {startMenuOpen?<motion.div 
        key={0}
        variants={variants}
        initial={"closed"}
        animate={"open"}
        exit={"closed"}
        id="StartMenu">
          <Particles
            id="tsparticles"
            options={options}/>
          <motion.div id="GridWrapper">
            <StartMenuItem 
              name="Back to Desktop"
              background={"url(/wallpaper/1.jpg)"}
              renderIcon={false}/>
            <StartMenuItem 
              name="Win1"
              background={"#0CA2FF"}
              icon={Icons.configApplication}
              target="win1"/>
            <StartMenuItem 
              name="Win2"
              background={"#27D260"}
              icon={Icons.configApplication}
              target="win2"/>
          </motion.div>
      </motion.div>:null}
    </AnimatePresence></>,
  mb81ref.current):null}</>);
}
export const Taskbar=({mb81ref}:{mb81ref:React.RefObject<HTMLDivElement>}):ReactElement=>{
  // @ts-ignore
  const [windows]=useAtom(DerivedTaskbarWinAtom);
  // const windows=useAtomValue(selectAtom(DerivedTaskbarWinAtom,(v)=>v));
  const[startMenuOpen,setStartMenuOpen]=useAtom(startMenuAtom);
  interface IAppItem {
    // key:string;
    id:string;
    _key:number;
  }
  const AppItem=({id,_key}:IAppItem):ReactElement=>{
    const[windows2,updateWindow]=useAtom(DerivedWinModifierAtom);
    useEffect(()=>{
      console.table(windows2);
    },[windows2]);
    // const setWindow=useSetAtom(DerivedTaskbarItemWinAtom);
    return(<>{windows2.filter(i=>i.id==id)[0].open
      &&<motion.div 
        initial={"closed"}
        animate={"open"}
        transition={{duration:.35}}
        exit={"closed"}
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
    </motion.div>}</>);
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
        {windows.map((win,i)=>
          <AppItem key={i} _key={i} id={win}/>)}
      </AnimatePresence>
    </motion.div>
  </>);
}