import { useEffect, useMemo, useState, type ReactElement } from "react";
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
export const StartMenu=({}):ReactElement|null=>{
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
  // useKeyPress("Escape",()=>{
  //   setStartMenuOpen(false);
  // });
  const [init,setInit]=useState(false);
  return(startMenuOpen?
    createPortal(<AnimatePresence>
      <motion.div 
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

          </motion.div>
      </motion.div>
    </AnimatePresence>,
  document.getElementById("root")!):null);
}
export const Taskbar=({}):ReactElement=>{
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
    <StartMenu/>
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