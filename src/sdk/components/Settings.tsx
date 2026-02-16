import "./styles/Settings.scss";
import type { ReactElement } from "react";
import { useRef } from "react";
import { atom, useAtom } from "jotai";
import { isMotionComponent, motion, AnimatePresence } from "motion/react";
import { DerivedSetttingsAtom } from "../store";
export const Settings=({}):ReactElement=>{
  const[settings,setSettings]=useAtom(DerivedSetttingsAtom);
  return(<>
    <motion.div id="settings">
      <h1>Settings</h1>
      <motion.div id="font">
        <motion.h2>Font</motion.h2>
        <motion.p>Select a font: </motion.p>
        <select 
          onChange={(e)=>{
            setSettings(["font",e.target.value]);
          }}
          name="Font" 
          id="fontSelector" 
          defaultValue={settings.font}>
            <option value="segoe">Segoe UI</option>
            <option value="tahoma">Tahoma</option>
            <option value="comic">Comic Sans</option>
            <option value="time">Times New Roman</option>
        </select>
      </motion.div><br/>
      <motion.div id="theme">
        <motion.h2>Theme</motion.h2>
        <motion.p>Select a theme: </motion.p>
        <select 
          onChange={(e)=>{
            setSettings(["theme",e.target.value]);
          }}
          name="Theme" 
          id="themeSelector" 
          defaultValue={settings.theme}>
            <option value="default">Default</option>
        </select>
      </motion.div><br/>
      <motion.div id="background">
        <motion.h2>Background</motion.h2>
        <motion.p>Select a background: </motion.p>
        <input type="file" id="backgroundSelector"/>
      </motion.div>
    </motion.div>
  </>);
}