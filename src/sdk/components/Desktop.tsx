import { useSortable } from '@dnd-kit/react/sortable';
import { motion } from 'motion/react';
import { useEffect, useState, type CSSProperties, type ReactElement } from 'react';
import "./styles/Desktop.scss";
import { Icons } from './Enum';
import { useAtom } from 'jotai';
import { ExpressDerivedWinModifierAtom, SettingsAtom } from '../store';
export const Desktop=({}):ReactElement=>{
  const[settings,]=useAtom(SettingsAtom);
  const[textColor,setTextColor]=useState<string>("#000");
  const DesktopIcon=({
    id,target,index,title,icon
  }:{
    id:string|number,
    title:string,
    index:number,
    icon:string,
    target:string
  }):ReactElement=>{
    // const{ref}=useDraggable({id:num,});
    const{ref}=useSortable({id,index});
    const[_windows,updateWindow]=useAtom(ExpressDerivedWinModifierAtom);
    return(<>
      <motion.div 
        onDoubleClick={(e)=>{
          e.preventDefault();
          updateWindow([
            [target,"open",true],
            [target,"minimized",false],
          ]);
        }}
        ref={ref} 
        className='DesktopIcon'>
          <motion.div 
            style={{
              backgroundImage:`url("${icon}")`,
              color:textColor,
            }}
            className='icon'></motion.div>
          <motion.span>{title}</motion.span>
      </motion.div>
    </>);
  }
  useEffect(()=>{
    //?attempt using @check-light-or-dark/image
    //? => did not work because of "not a function" error, even tho it is
    // lightOrDarkImage({
    //   image:settings.backgroundImage,
    // }).then(res=>{
    //   setTextColor(res=="dark"?"#fff":"#000");
    // });
  },[]);
  const icons:{
    id:string,
    target:string,
    icon:string,
    title:string
  }[]=[
    {
      id:"i1",
      title:"Test Window",
      target:"win1",
      icon:Icons.configApplication
    },{
      id:"i2",
      title:"Settings",
      target:"settings",
      icon:Icons.configApplication
    },
  ]
  return(<>
    <motion.div id="Desktop">
      {icons.map((data,index)=>
        <DesktopIcon 
          key={data.id} 
          id={data.id} 
          target={data.target} 
          icon={data.icon} 
          title={data.title} 
          index={index} />
      )}
    </motion.div>
  </>);
}
