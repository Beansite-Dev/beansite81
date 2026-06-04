import { atom, useAtom } from "jotai";
import type { ReactElement } from "react";
import { generateId } from "../../../sdk/Lib";
import { ExpressDerivedWinModifierAtom, SettingsAtom } from "../../../sdk/store";
import { Icons } from "../../../sdk/components/Enum";
import { Window } from "../../../sdk/sdk";
import { motion } from "motion/react";
import "./style.scss";
import "./iv.scss";
import { ImageViewer } from 'react-iv-viewer';
export interface iphotosAtom{
  // isOpen:boolean;
  directoryTree:string[];
  file:fs.File;
}
export const photosAtom=atom<iphotosAtom>({
  // isOpen:false,
  directoryTree:[],
  file:{
    name:"new",
    isDirectory:false,
    type:"image",
    content:"",
    id:generateId(10),
    attributes:{
      dateCreated:new Date(),
      openWithNotepad:true,
    }
  },
});
const Photos=({bounds}:{bounds:any}):ReactElement=>{
  const[photos,setPhotos]=useAtom(photosAtom);
  const[windows,setWindow]=useAtom(ExpressDerivedWinModifierAtom);
  // const[settings,]=useAtom(SettingsAtom);
  return(<>
    <Window
      id="photos"
      y={70}
      x={70}
      height={350}
      bounds={bounds}
      width={350*(16/10)}
      closed
      // closed={!settings.defaultOpenApps.photos}
      icon={Icons.photos}
      title={`Photos - viewing ${photos.file.name}`}>
        <motion.div id="photosWrapper">
          <ImageViewer 
            width="100%"
            height="100%"
            defaultZoom={75} 
            img={photos.file.content}/>
        </motion.div> 
    </Window>
  </>);
};
export default Photos;