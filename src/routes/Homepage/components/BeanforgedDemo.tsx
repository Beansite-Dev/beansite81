//Beanforged
import { motion } from "motion/react";
import { useLiveQuery } from "dexie-react-hooks";
import { Suspense, useEffect, useRef, useState, type ReactElement } from "react";
import "./beanforged.scss";
import { Tabs } from "@base-ui/react/tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faFileImport, faFolderPlus, faGear, faHome, faInbox, faPlay, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { WindowSymbols } from "../../../sdk/components/Enum";
import { MD5 } from "crypto-js";
import { Dialog } from "@base-ui/react/dialog";
import { Popover } from "@base-ui/react/popover";
import { bfdb, defaultInstances } from "./db";
import { generateId } from "../../../sdk/Lib";
import { Tooltip } from "@base-ui/react";
const Beanforged=({}):ReactElement=>{
  const generateUsername=()=>{
    const adjectives=["Cool","Brave","Clever","Swift","Quiet","Sunny","Wild","Calm","Bold","Sharp"];
    const nouns = ["Tiger","Eagle","Wolf","Fox","Lion","Bear","Hawk","Snake","Shark","Horse"];
    const numbers=Math.floor(Math.random()*100);
    const randomAdjective=adjectives[Math.floor(Math.random()*adjectives.length)];
    const randomNoun=nouns[Math.floor(Math.random()*nouns.length)];
    return`${randomAdjective}${randomNoun}${numbers}`;
  }
  const username=generateUsername();
  const generateGravatarUrl=(email:string,size=40,defaultImage='identicon')=>{
    const trimmedEmail=email.trim().toLowerCase();
    const hash=MD5(trimmedEmail).toString();
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=${defaultImage}`;
  }
  interface ITabListPage{arr?:any[];}
  const TabListPage=({arr}:ITabListPage):ReactElement=>{
    const savedInstances=useLiveQuery(()=>bfdb.savedInstances.toArray());
    const TopBar=({}):ReactElement=>{
      return(<motion.div className="bf_topBar">
        <motion.div id="mclogo"></motion.div>
        <motion.div id="searchbarWrapper">
          <motion.div id="icon">
            <FontAwesomeIcon icon={faSearch}/>
          </motion.div>
          <motion.input 
            id="searchbar" 
            type="text"
            placeholder={`Search for Minecraft projects`}/>
        </motion.div>
        <motion.div className="seperator"></motion.div>
        <motion.div id="userAccount">
          <motion.div 
            style={{backgroundImage:`url("${generateGravatarUrl(username+"@gmail.com")}")`}}
            id="userProfilePicture"></motion.div>
          <motion.div id="userName">{username}</motion.div>
        </motion.div>
      </motion.div>);
    }
    const containerRef=useRef(null);
    const ModpacksTab=({}):ReactElement=>{
      const[open,setOpen]=useState(false);
      useEffect(()=>{if(savedInstances){
        console.warn(savedInstances);
      }},[savedInstances]);
      const LaunchButton=({}):ReactElement=>{
        return(<Dialog.Root>
          <Dialog.Trigger id="GUI_launch" className="action">
            <FontAwesomeIcon icon={faPlay}/>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="Backdrop" />
            <Dialog.Popup className="Popup">
              <Dialog.Title className="Title">Continue On Beansite</Dialog.Title>
              <Dialog.Description className="Description">
                This feature is demo only, please continue on Beansite to play this game.
              </Dialog.Description>
              <div className="Actions">
                <a href="/app"><button className="button bold">Continue</button></a>
                <Dialog.Close 
                  className="button transparent">Close</Dialog.Close>
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>);
      }
      return(<><Tooltip.Provider>
        <motion.div id="instances" ref={containerRef}>
          {savedInstances?[...defaultInstances,...savedInstances]!.map((x)=>
            <motion.div key={x.id} className="instanceWrapper">
              <motion.div 
                style={{background:`url(${x.icon})`,}}
                className="cover"></motion.div>
              <motion.div className="version">{x.version}</motion.div>
              <Tooltip.Root>
                <Tooltip.Trigger className="h1">{x.name}</Tooltip.Trigger>
                <Tooltip.Portal container={containerRef}>
                  <Tooltip.Positioner sideOffset={10}>
                    <Tooltip.Popup className="ttpopup">
                      {x.name}
                    </Tooltip.Popup>
                  </Tooltip.Positioner>
                </Tooltip.Portal>
              </Tooltip.Root>
              <motion.div className="bfrowWrapper" style={{gap:"0 !important",margin:"0 .5rem",}}>
                <LaunchButton/>
                <motion.button 
                  onClick={(e)=>{
                    e.preventDefault();
                    bfdb.transaction('rw',bfdb.savedInstances,function*(){
                      bfdb.savedInstances.filter(i=>i.id==x.id).toArray().then(z=>console.log(z));
                      yield bfdb.savedInstances.filter(i=>i.id==x.id).delete();
                      bfdb.savedInstances.toArray().then(z=>console.log(z));
                    }).catch(e=>{console.error(e);});
                  }}
                  className="action">
                    <FontAwesomeIcon icon={faTrash}/>
                </motion.button>
              </motion.div>
            </motion.div>):<motion.h1 className="bflstxt">Loading...</motion.h1>}
        </motion.div>
      </Tooltip.Provider></>);
    }
    const HomePageTabs=({}):ReactElement=>{
      return(<>
        <Tabs.Root defaultValue="modpacks" id="HomepageTabs">
          <Tabs.List className="hpl">
            <Tabs.Tab className="hptab" value="modpacks">My Modpacks</Tabs.Tab>
            <Tabs.Indicator className="hpi"/>
          </Tabs.List>
          <Tabs.Panel className="hpp" value="modpacks">
            <ModpacksTab/>
          </Tabs.Panel>
        </Tabs.Root>
      </>);
    };
    return(<>
      <TopBar/>
      <HomePageTabs/>
    </>);
  }
  return(<>
    <motion.div id="bf_appwrapper">
    <Tabs.Root orientation="vertical" defaultValue="home" className="bfTabWrap">
      <Tabs.List id="bf_sidebar" activateOnFocus loopFocus>
        <Tabs.Tab value="home" className="bf_sb_icon">
          <FontAwesomeIcon className="icon" icon={faHome} />
        </Tabs.Tab>
        <motion.div id="spacer"></motion.div>
        <Tabs.Tab value="settings" className="bf_sb_icon">
          <FontAwesomeIcon className="icon" icon={faGear} />
        </Tabs.Tab>
        <Tabs.Indicator id="indicator" />
      </Tabs.List>
      <Tabs.Panel className="panel" value="home">
        <TabListPage/>
      </Tabs.Panel>
      <Tabs.Panel className="panel" value="settings">
        <motion.span className="settingsInfo">Current Version: {import.meta.env.VITE_BEANFORGED_VERSION}_DEMO</motion.span>
        <motion.span className="settingsInfo">Build Date: {import.meta.env.VITE_APP_BUILD_DATE}</motion.span>
      </Tabs.Panel>
      {/* <Tabs.Panel value="create"></Tabs.Panel> */}
    </Tabs.Root>
    </motion.div>
  </>);
}
export default Beanforged;