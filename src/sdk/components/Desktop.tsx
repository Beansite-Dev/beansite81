import { useSortable } from '@dnd-kit/react/sortable';
import { motion } from 'motion/react';
import { useEffect, useRef, useState, type CSSProperties, type ReactElement } from 'react';
import "./styles/Desktop.scss";
import { Icons } from './Enum';
import { useAtom } from 'jotai';
import { ExpressDerivedWinModifierAtom, SettingsAtom } from '../store';
import { Tooltip } from '@base-ui/react/tooltip';
export const Desktop=({}):ReactElement=>{
  const[settings,]=useAtom(SettingsAtom);
  const containerRef=useRef(null);
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
          <Tooltip.Root>
            <Tooltip.Trigger className="title">
              {title}
            </Tooltip.Trigger>
            <Tooltip.Portal container={containerRef}>
              <Tooltip.Positioner sideOffset={2} align='start' side="bottom">
                <Tooltip.Popup className="dttpopup">
                  C:\BeansitesFiles\{target}\{target}.exe
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
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
    },{
      id:"i3",
      title:"Beanpowered",
      target:"beanpowered",
      icon:Icons.beanpowered
    },{
      id:"i4",
      title:"Beanforged",
      target:"beanforged",
      icon:Icons.beanforged
    },{
      id:"i5",
      title:"Blog",
      target:"blog",
      icon:Icons.text
    },{
      id:"i6",
      title:"Beanshell",
      target:"beanshell",
      icon:Icons.beanshell
    },{
      id:"i7",
      title:"Explorer",
      target:"explorer",
      icon:Icons.fileManager
    },
  ]
  return(<>
    <motion.div id="Desktop" ref={containerRef}>
      <Tooltip.Provider>
        {icons.map((data,index)=>
          <DesktopIcon 
            key={data.id} 
            id={data.id} 
            target={data.target} 
            icon={data.icon} 
            title={data.title} 
            index={index} />
        )}    
      </Tooltip.Provider>
    </motion.div>
  </>);
}
