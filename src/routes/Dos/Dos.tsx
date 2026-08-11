import { motion } from 'motion/react';
import React, { createRef, useEffect, type RefObject, type ReactElement } from "react";
import { useDosbox } from "usedosbox";
import "./style.scss";
import { Helmet } from 'react-helmet-async';
import { DosPlayer as Instance, type DosPlayerFactoryType } from "js-dos";
//types
declare const Dos:DosPlayerFactoryType;
declare global{interface Window{Dosbox:Object|any;}}
interface DosPlayerProps{bundleUrl:string;}
interface IDosBoxComponent{path:string;}
//component
const DosPlayer=({bundleUrl}:DosPlayerProps)=>{
  const canvasRef=createRef<HTMLCanvasElement>();
  const {
    startDosbox,
    stopDosbox,
    isDosboxLoading,
    isDosboxReady,
    loadedSize,
    totalSize,
    percentage,
  }=useDosbox({
    canvasRef:(canvasRef as RefObject<HTMLCanvasElement>),
    gameFile:bundleUrl,
    dosboxUrl:"/dos/dosbox-sync.js",
  });
  useEffect(()=>{return()=>{stopDosbox();};},[stopDosbox]);
  return(<>
    <button type="button" onClick={startDosbox}>Start</button>
    <canvas
      id="canvas"
      ref={canvasRef}
      style={{width:"600px",height:"400px"}}/>
  </>);
}
const DosboxPage=({path}:IDosBoxComponent):ReactElement=>{
  return(<>
    <Helmet>
      <title>dosbox - {path}</title>
    </Helmet>
    <motion.div className='DosPageWrapper'>
      <p>{path}</p>
      <DosPlayer bundleUrl={path} />
    </motion.div>
  </>);
};
export default DosboxPage;