//url: https://demo.webfuse.com/+iframetest/?url=
import { use, useEffect, useRef, useState, type ReactElement } from "react";
import "./style.scss";
import { motion } from "motion/react";
import { atom, useAtom } from "jotai";
import { generateId } from "../../sdk/Lib";
import { Tabs } from "@base-ui/react";
import { Icon, Icons } from "../../sdk/components/Enum";
import { ExpressDerivedWinModifierAtom } from "../../sdk/store";
interface IfirebeanTabsAtom{title:string;url:string;id:string;icon:string;};
const NewTab:Omit<IfirebeanTabsAtom,"id">={
  title:"New Tab",
  url:"https://demo.webfuse.com/+iframetest/?url="+encodeURIComponent("https://duckduckgo.com/"),
  icon:"firebean",
};
const Firebean=({}):ReactElement=>{
  const[firebeanTabs,setFirebeanTabs]=useState<IfirebeanTabsAtom[]>([{...NewTab,id:generateId(10)}]);
  const[currentTab,setCurrentTab]=useState<IfirebeanTabsAtom|undefined>();
  const[,setWindow]=useAtom(ExpressDerivedWinModifierAtom);
  const listRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    listRef.current!.scrollLeft=listRef.current!.scrollWidth;
    if(firebeanTabs.length<1)setWindow([["firebean","open",false]]);
  },[firebeanTabs]);
  return(<>
    <Tabs.Root 
      onValueChange={(x)=>{setCurrentTab(firebeanTabs.filter(y=>y.id===x)[0]);}}
      defaultValue={firebeanTabs[0]}>
        <motion.div className="fbHeader">
          <motion.input
            //placeholder={`Search ${directoryTree[directoryTree.length-1]||"This PC"} ⌕`}
            value={decodeURIComponent(
              (currentTab?.url||(firebeanTabs[0]?firebeanTabs[0]?.url:""))
              .replace("https://demo.webfuse.com/+iframetest/?url=",""))}
            type="text"
            className="urlBar"/>
          <motion.input
            placeholder={`Search... ⌕`}
            onKeyPress={(e)=>{
              if(e.key==="Enter"){
                let newTab:IfirebeanTabsAtom={
                  url:"https://demo.webfuse.com/+iframetest/?url="+encodeURIComponent("https://duckduckgo.com/?q="+e.currentTarget.value),
                  title:"Search",
                  id:generateId(10),
                  icon:Icons.search,
                };
                setFirebeanTabs(y=>[...y,newTab]);
              }
            }}
            type="text"
            className="searchBar"/>
        </motion.div>
          <Tabs.List 
            className="fbTabList" 
            onWheel={(e)=>{listRef.current!.scrollLeft+=e.deltaY;}}
            ref={listRef}>
              {firebeanTabs.map(x=><Tabs.Tab className="fbTab" render={<motion.div>
                <Icon icon={x.icon} className="icon"/>
                <motion.button 
                  onClick={(e)=>{setFirebeanTabs(y=>y.filter(z=>z.id!==x.id));}}
                  className="closeButton"></motion.button>
                {x.title}
              </motion.div>} value={x.id} nativeButton={false}></Tabs.Tab>)}
              <motion.button 
                className="createTab" 
                onClick={(e)=>{
                  let newTab:IfirebeanTabsAtom={...NewTab,id:generateId(10)};
                  setFirebeanTabs(y=>[...y,newTab]);
                }}>
                  <motion.span className="icon" style={{backgroundImage:`url("${Icons.new}")`}}></motion.span>
              </motion.button>
          </Tabs.List>
        {firebeanTabs.map(x=><Tabs.Panel className="fbPanel" keepMounted value={x.id}>
          <motion.iframe src={x.url}/>
        </Tabs.Panel>)}
    </Tabs.Root>
  </>);
};
export default Firebean;