import { motion } from "motion/react";
import { useLiveQuery } from "dexie-react-hooks";
import { Suspense, useEffect, useRef, useState, type ReactElement } from "react";
import "./style.scss";
import { Tabs } from "@base-ui/react/tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faFileImport, faFolderPlus, faGear, faHome, faInbox, faPlay, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { WindowSymbols } from "../../sdk/components/Enum";
import { MD5 } from "crypto-js";
import { Dialog } from "@base-ui/react/dialog";
import { Popover } from "@base-ui/react/popover";
import { bfdb, defaultInstances } from "./db";
import { generateId } from "../../sdk/Lib";
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
      const CreateButton=({}):ReactElement=>{
        return(<Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="button">
            <FontAwesomeIcon icon={faPlus}/> Create
          </Dialog.Trigger>
          <Dialog.Portal container={containerRef!.current}>
            <Dialog.Backdrop className="backdrop"/>
            <Dialog.Popup className="popup">
              <Dialog.Title>Create/Import Instance</Dialog.Title>
              <motion.p>Import a modpack from file or from url, or create a new blank instance</motion.p>
              <motion.div className="rowWrapper">
                <input onChange={async(e)=>{
                  const file=(e.target as HTMLInputElement).files![0];
                  if(file){
                    const id=generateId(10);
                    await bfdb.savedInstances.put({
                      id:id,
                      name:file.name,
                      isFile:true,
                      src:file,
                      version:"Custom",
                      icon:"/apps/beanforged/eagler.png",
                    });
                  }
                }} type="file" id="file"/>
                <motion.button 
                  onClick={(e)=>{
                    e.preventDefault();
                    document.getElementById("file")!.click();
                  }} className="button b2">Upload File</motion.button>
                <motion.input 
                  style={{display:"none",}}
                  onKeyDown={async(e)=>{try{
                    if(e.key==="Enter"){
                      const url=(e.target as HTMLInputElement).value;
                      const response=await fetch(url);
                      const blob=await response.blob();
                      bfdb.savedInstances
                      await bfdb.savedInstances.put({
                        id:generateId(10),
                        name:"New Instance: "+url,
                        isFile:true,
                        src:blob,
                        version:"Custom",
                        icon:"/apps/beanforged/eagler.png",
                      });
                    }
                  }catch(error){
                    console.error('Failed to download or store file:', error);
                  }}}
                  type="text" 
                  id="text" 
                  placeholder="File URL"/>
              </motion.div>
              <Dialog.Close className="button b2">Close</Dialog.Close>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>);
      }
      return(<><Tooltip.Provider>
        <motion.div id="mpt_toolbar" ref={containerRef}>
          <CreateButton/>
          <motion.button className="button">
            <FontAwesomeIcon style={{rotate:"90deg"}} icon={faArrowRightToBracket}/> Import
          </motion.button>
          <motion.button className="button">
            <FontAwesomeIcon icon={faFolderPlus}/> Create Group
          </motion.button>
        </motion.div><br/>
        <motion.div id="instances">
          {savedInstances?[...defaultInstances,...savedInstances]!.map((x)=>
            <motion.div key={x.id} className="instanceWrapper">
              <motion.div 
                style={{backgroundImage:`url("${x.icon}")`,}}
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
              <motion.div className="rowWrapper" style={{gap:"0 !important",margin:"0 .5rem",}}>
                <motion.button 
                  onClick={(e)=>{
                    e.preventDefault();
                    window.open(
                      (x.src instanceof Blob)?URL.createObjectURL(x.src):x.src,x.name,
                      "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=640,height=360,top=100,left=100"); 
                  }}
                  className="action">
                    <FontAwesomeIcon icon={faPlay}/>
                </motion.button>
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
    <Tabs.Root orientation="vertical" defaultValue="home">
      <Tabs.List id="bf_sidebar" activateOnFocus loopFocus>
        <Tabs.Tab value="home" className="bf_sb_icon">
          <FontAwesomeIcon className="icon" icon={faHome} />
        </Tabs.Tab>
        <motion.button className="bf_sb_icon">
          <FontAwesomeIcon className="icon" icon={faPlus} />
        </motion.button>
        <motion.div id="spacer"></motion.div>
        <Tabs.Tab value="settings" className="bf_sb_icon">
          <FontAwesomeIcon className="icon" icon={faGear} />
        </Tabs.Tab>
        <Tabs.Indicator id="indicator" />
      </Tabs.List>
      <Tabs.Panel className="panel" value="home">
        <TabListPage/>
      </Tabs.Panel>
      {/* <Tabs.Panel value="create"></Tabs.Panel> */}
    </Tabs.Root>
    </motion.div>
  </>);
}
export default Beanforged;