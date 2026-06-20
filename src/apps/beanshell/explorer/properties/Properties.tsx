import { atom, useAtom } from "jotai";
import type { ReactElement } from "react";
import { generateId } from "../../../../sdk/Lib";
import { ExpressDerivedWinModifierAtom, SettingsAtom } from "../../../../sdk/store";
import { Icon, iconPathToIcon, Icons } from "../../../../sdk/components/Enum";
import { Window } from "../../../../sdk/sdk";
import { motion } from "motion/react";
import "./style.scss";
import { fileNameToEnglish, fileNameToIcon } from "../Explorer";
export interface ipropertiesAtom{
  // isOpen:boolean;
  directoryTree:string[];
  file:fs.File|fs.Directory;
}
export const formatBytes=(bytes:number)=>{
  if(!+bytes)return'0 Bytes';
  const k=1024;
  const sizes=['Bytes','KB','MB','GB','TB','PB','EB','ZB','YB'];
  const i=Math.floor(Math.log(bytes)/Math.log(k));
  return`${parseFloat((bytes/Math.pow(k,i)).toFixed(2))} ${sizes[i]}`;
}
export const propertiesAtom=atom<ipropertiesAtom>({
  // isOpen:false,
  directoryTree:[],
  file:{
    name:"new",
    isDirectory:false,
    type:"txt",
    content:"",
    id:generateId(10),
    attributes:{
      dateCreated:new Date(),
      openWithNotepad:true,
    }
  },
});
const Properties=({bounds}:{bounds:any}):ReactElement=>{
  const[properties,]=useAtom(propertiesAtom);
  const[windows,setWindow]=useAtom(ExpressDerivedWinModifierAtom);
  // const[settings,]=useAtom(SettingsAtom);
  const Divider=({}):ReactElement=>{
    return(<motion.tr>
      <motion.td colSpan={2} className="divider">
        <motion.hr className="dividerLine"/>
      </motion.td>
    </motion.tr>);
  };
  return(<>
    <Window
      id="properties"
      y={80}
      x={80}
      height={480}
      width={380}
      bounds={bounds}
      closed
      includeButton={[true,false,false]}
      icon={fileNameToIcon(properties.file)}
      title={`${properties.file.name} Properties`}>   
        <motion.table>
          <motion.tr>
            <motion.td>
              <Icon 
                icon={iconPathToIcon(fileNameToIcon(properties.file,true))} 
                className="icon"/>
            </motion.td>
            <motion.td>{properties.file.name}{properties.file.isDirectory?"":`.${(properties.file as fs.File).type}`}</motion.td>
          </motion.tr>
          <Divider/>
          <motion.tr>
            <motion.td>Type of file:</motion.td>
            <motion.td>{fileNameToEnglish(properties.file)}{!!(properties.file as fs.File).type?` (.${(properties.file as fs.File).type})`:""}</motion.td>
          </motion.tr>
          <motion.tr>
            <motion.td>Description:</motion.td>
            <motion.td>None</motion.td>
          </motion.tr>
          <Divider/>
          <motion.tr>
            <motion.td>Location:</motion.td>
            <motion.td>{properties.file.name==="DESKTOP-BS726"?"B:/":"B:/"
              +properties.directoryTree.join("/")
              +(properties.directoryTree.length>0?"/":"")
              +properties.file.name
              +(properties.file.isDirectory?"":`.${(properties.file as fs.File).type}`)}</motion.td>
          </motion.tr>
          <motion.tr>
            <motion.td>Size:</motion.td>
            <motion.td>
              {formatBytes(JSON.stringify(properties.file).length)}
              &nbsp;({(JSON.stringify(properties.file).length).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} bytes)
            </motion.td>
          </motion.tr>
          <motion.tr>
            <motion.td>Size on disk:</motion.td>
            <motion.td>
              {formatBytes(Math.ceil((JSON.stringify(properties.file).length)/4096)*4096)} 
              &nbsp;({(Math.ceil((JSON.stringify(properties.file).length)/4096)*4096).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} bytes)</motion.td>
          </motion.tr>
          <Divider/>
          <motion.tr>
            <motion.td>Created:</motion.td>
            <motion.td>
              {new Intl.DateTimeFormat('en-US',{
                weekday:'long',month:'long',day:'numeric',year:'numeric',
                hour:'numeric',minute:'2-digit',second:'2-digit',hour12:true
              }).format(properties.file
                ?(properties.file.attributes as fs.FileAttributes).dateCreated
                :new Date())}</motion.td>
          </motion.tr>
          <motion.tr>
            <motion.td>Modified:</motion.td>
            <motion.td>
              {new Intl.DateTimeFormat('en-US',{
                weekday:'long',month:'long',day:'numeric',year:'numeric',
                hour:'numeric',minute:'2-digit',second:'2-digit',hour12:true
              }).format(properties.file
                ?(properties.file.attributes as fs.FileAttributes).dateModified
                :new Date())}</motion.td>
          </motion.tr>
          <Divider/>
          <motion.tr>
            <motion.td>Attributes:</motion.td>
            <motion.td>
              <motion.div className="attribute" style={{gap:"1rem"}}>
                <motion.div className="attribute">
                  <motion.input
                    type="checkbox"
                    checked={!!(properties.file.attributes.readOnly||properties.file.attributes.system)}/>
                  Read-only
                </motion.div>
                <motion.div className="attribute">
                  <motion.input
                    type="checkbox"
                    checked={!!properties.file.attributes.hidden}/>
                  Hidden
                </motion.div>
              </motion.div>
            </motion.td>
          </motion.tr>
        </motion.table>
        <motion.div className='error_actionWrapper'>
          <motion.button onClick={(e)=>{
            setWindow([["properties","open",false],]);
          }}>OK</motion.button>
        </motion.div>
    </Window>
  </>);
};
export default Properties;