//! FIX !!
//https://js-dos.com/v7/build/
//https://js-dos.com/v7/build/docs/react/
import { motion } from 'motion/react';
import React, { useEffect, useRef, useState, type ReactElement } from 'react';
import "./style.scss";
import { Helmet } from 'react-helmet-async';
import { DosPlayer as Instance, DosPlayerFactoryType } from "js-dos";
declare const Dos:DosPlayerFactoryType;
//types
declare global{interface Window{Dosbox:Object|any;}}
interface DosPlayerProps{bundleUrl:string;}
interface IDosBoxComponent{path:string;}
//component
const DosPlayer=(props:DosPlayerProps):ReactElement=>{
  const rootRef=useRef<HTMLDivElement>(null);
  const[dos,setDos]=useState<Instance | null>(null);
  useEffect(()=>{
    if(rootRef===null||rootRef.current===null)return;
    const root=rootRef.current as HTMLDivElement;
    const instance=Dos(root);
    setDos(instance);
    return()=>{instance.stop();};
  },[rootRef]);
  useEffect(()=>{
    if(dos!==null)dos.run(props.bundleUrl);
  },[dos,props.bundleUrl]);
  return<div 
    ref={rootRef}
    style={{width:"100%",height:"100%"}}></div>;
};
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