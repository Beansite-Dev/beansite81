import { useEffect, useMemo, useState, type CSSProperties, type ReactElement } from "react";
import "./styles/StartMenu.scss";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import { atom, useAtom } from "jotai";
import { ExpressDerivedWinModifierAtom } from "../store";
import { createPortal } from "react-dom";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { Icons } from "./Enum";
export const startMenuAtom=atom<boolean>(false);
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
interface IStartMenuItem {
  name:string;
  icon?:string;
  background:string;
  renderIcon?:boolean;
  customCallback?:()=>void;
  target?:string;
  style?:CSSProperties;
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
    
    "retina_detect": true
  }),[],);
  const [init,setInit]=useState(false);
  const StartMenuItem=({
    name,
    icon,
    background,
    renderIcon=true,
    customCallback,
    target,
    style,
  }:IStartMenuItem):ReactElement=>{
    const[_windows,updateWindow]=useAtom(ExpressDerivedWinModifierAtom);
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
            updateWindow([
              [target,"open",true],
              [target,"minimized",false],
            ]);
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
              name="Changelog"
              background={"#27D260"}
              icon={Icons.text}
              target="changelog"/>
            <StartMenuItem 
              name="Settings"
              background={"#D653E7"}
              icon={Icons.configApplication}
              target="settings"/>
          </motion.div>
      </motion.div>:null}
    </AnimatePresence></>,
  mb81ref.current):null}</>);
}
