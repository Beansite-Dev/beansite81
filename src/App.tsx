import { lazy, StrictMode, useEffect, useState, type ReactElement } from 'react';
import { Beansite81, Window } from './sdk/sdk';
import { Icon, Icons, IconsOld } from './sdk/components/Enum';
import { Helmet } from "react-helmet-async";
import { motion } from 'motion/react';
import { useAtom } from 'jotai';
import "./style.scss";
import { ExpressDerivedSettingsAtom, ExpressDerivedWinModifierAtom, } from './sdk/store';
// import { DeclarativeRouter } from './router.tsx';
export const CHANGELOG:{
  versionName:string,
  releaseDate:string,
  comment:string,
  changes:string[],
}={
  versionName:import.meta.env.VITE_APP_VERSION,
  releaseDate:import.meta.env.VITE_APP_BUILD_DATE,
  comment: "im free",
  changes:[
    //functionality
    "TODO: Add renaming to explorer", 
    "TODO: Add corner and side maximizing",
    //apps
    "TODO: Add Task Manager", //!<- do this already  bro
    "TODO: Add Beanhelper (Chat)",//gemeni api
    "TODO: Work on Dosbox pages",
    "TODO: Add curl command to beanshell",
    "TODO: Start browser implementation using libcurl.js (https://github.com/ading2210/libcurl.js)",
    //mods
    "TODO: Add mod file option uploads",
    "TODO: Add docs for mod development",
    //lib
    "TODO: Update stylsheets to use css modules (where applicable, since the theming classes cant effectivley use modules without breaking functionality or atleast i think. ill try)",
    "TODO: Add css compatibility for firefox and older chrome versions",

    "Style fix x2",
    "Started implemented ModStoreWinProvider",
    "Started implemented docs",
    "Added hollow knight",
    "Added games submodule",
    "Added custom data attributes to windows",
    "Updated rounded windows mod to account for maximized windows",
    "Added custom css theming via file upload and '.custom' class",
    "Updated pnpm",
    "Updated themelib to exclude start menu button",
    "Upodated settings menu to allow custom themeing",
    "Finished ModStoreWinProvider",
    "Added theme-builder mod",
    "Replaced Exluce with Omit in modstore",
    "Removed redundant comments",
    "Added visual filters mod",
    "Added search to settings",
    "Added vercel analytics",
    "Removed redundant go files",
    "Removed games for size restrictions and stuff",
    "Added game: Amanda the Adventurer",
    "Added game: Baldi's Plus",
    "Added game: Buckshot Roulette",
    "Added game: Class of 09",
    "Added game: Andy's Apple Farm",
    "Added game: Bendy and the Ink Machine",
    "Added game: Bergen Truck",
    "Added game: Dead Plate",
    "Added game: The Deadseat",
    "Added game: Fear to Fathom - Home Alone",
    "Added game: Deltatraveler",
    "Added game: Getting Over It",
    "Added game: Happy Sheepies",
    "Added game: Hotline Miami",
    "Added game: Human Expenditure Program",
    "Added game: Jelly Drift",
    "Added game: Karlson",
    "Added game: Kindergarten",
    "Added game: Lacy's Flash Games",
    "Added game: Minesweeper Plus",
    "Added game: Omori",
    "Added game: People Playground",
    "Added game: Pizza Tower",
    "Added game: Raft",
    "Added game: Repo",
    "Added game: Sonic.exe",
    "Added game: Tattletail",
    "Added game: Ultrakill",
    "Added game: Undertale Yellow",
    "Added game: Web Fishing",
    "Added game: Yandere Simulator",
    "Added game: Yume Nikki",
    "Version push",
    "Game restore",
    "Bugfix: made modstore mod styling persistent",
    "Bugfix: made modstore windows clear when mod get deleted",
    "Bugfixed most files and made the more efficient",
  ],
};
// import Settings from './sdk/components/Settings.tsx';
const Settings=lazy(()=>import('./sdk/components/Settings'));
const Beanpowered=lazy(()=>import('./apps/beanpowered/Beanpowered.tsx'));
const Beanforged=lazy(()=>import('./apps/beanforged/Beanforged.tsx'));
const Blog=lazy(()=>import('./apps/blog/Blog.tsx'));
const Beancord=lazy(()=>import('./apps/beancord/Beancord.tsx'));
const Debug=lazy(()=>import('./apps/debug/Debug.tsx'));
const TaskMgr=lazy(()=>import('./apps/taskmgr/TaskMgr.tsx'));
const Firebean=lazy(()=>import('./apps/firebean/Firebean.tsx'));
// const ModStoreClient=lazy(()=>import('./apps/modstore/ModStoreClient.tsx'));
import ModStoreClient from './apps/modstore/ModStoreClient.tsx';
import { ModStoreWinProvider } from './apps/modstore/ModStoreWinProvider.tsx';
import { ModStoreCSSProvider } from './apps/modstore/ModStoreStyleProvider.tsx';
//beanshell components
const Beanshell=lazy(()=>import('./apps/beanshell/Beanshell.tsx'));
const Explorer=lazy(()=>import('./apps/beanshell/explorer/Explorer.tsx'));
const Notepad=lazy(()=>import('./apps/beanshell/notepad/Notepad.tsx'));
const Photos=lazy(()=>import('./apps/beanshell/photos/Photos.tsx'));
const Properties=lazy(()=>import('./apps/beanshell/explorer/properties/Properties.tsx'));
const Changelog=({}):ReactElement=>{
  const[previousCommits,setPreviousCommits]=useState<GiteaApiRoot|string>("");
  const[loading,setLoading]=useState<boolean>(true);
  useEffect(()=>{
    fetch("https://gitea.com/api/v1/repos/m1dnight/beansite81/commits")
      .then(r=>r.json()).then(r=>{setPreviousCommits(r);setLoading(false);})
      .catch(e=>{setPreviousCommits(e);setLoading(false);})
  },[]);
  return(<>
    <motion.h1>{CHANGELOG.versionName} - {CHANGELOG.releaseDate}</motion.h1>
    <motion.p>{CHANGELOG.comment}</motion.p>
    <motion.ul>
      {CHANGELOG.changes.map((change,index)=>(
        <motion.li key={index}>{change}</motion.li>
      ))}
    </motion.ul>
    <motion.h1>Commit Log</motion.h1>
    {loading
      ?<motion.p>Loading commits...</motion.p>
      :Array.isArray(previousCommits)
      ?<motion.ul>
        {previousCommits.map((commitData)=>(<motion.li key={commitData.sha}>
          {commitData.commit.message}<br/>
          <motion.span className="sub">commited on {commitData.commit.committer.date} by {commitData.author?.full_name||"Tyler"}/{commitData.author?.username||"m1dnight"}</motion.span>
        </motion.li>))}
      </motion.ul>
      :<motion.p>Received error: {previousCommits}</motion.p>}
  </>);
}
const App=({}):ReactElement=>{
  const[settings,setSettings]=useAtom(ExpressDerivedSettingsAtom);
  const[,setWindow]=useAtom(ExpressDerivedWinModifierAtom);
  useEffect(()=>{
    localStorage.setItem("mb81-settings",JSON.stringify(settings));
    console.table(settings);
    // document.body.style.zoom=`${settings.scale}%`;
  },[settings]);
  useEffect(()=>{
    const handleBeforeUnload=(e:BeforeUnloadEvent)=>{if(settings.closeConfirmation)e.preventDefault()};
    window.addEventListener('beforeunload',handleBeforeUnload);
    return()=>window.removeEventListener('beforeunload',handleBeforeUnload);
  },[settings]);
  return(<>
    <Helmet>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/assets/favicon_modern.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Beansite 8.1 - App</title>
    </Helmet>
    <Beansite81>
      <Window
        id="win1"
        // maximized
        closed={!settings.defaultOpenApps["win1"]}
        icon={Icons.application}
        title="Test Win 1">
          <motion.h1>Welcome to Beansite 8.1</motion.h1>
          <motion.p>The best (and probably only) bean-themed virtual desktop</motion.p>
          <motion.ul>
            <motion.li className='link' onClick={(e)=>{setWindow([
              ["beanpowered","open",true],
              ["beanpowered","minimized",false],
            ]);}}><motion.span>Check out games on Beanpowered</motion.span></motion.li>
            <motion.li className='link' onClick={(e)=>{setWindow([
              ["beanforged","open",true],
              ["beanforged","minimized",false],
            ]);}}><motion.span>Try out MC 1.12.2</motion.span></motion.li>
            <motion.li className='link' onClick={(e)=>{setWindow([
              ["blog","open",true],
              ["blog","minimized",false],
            ]);}}><motion.span>Check out our blog</motion.span></motion.li>
            <motion.li className='link' onClick={(e)=>{setWindow([
              ["beancord","open",true],
              ["beancord","minimized",false],
            ]);}}><motion.span>Chat with friends</motion.span></motion.li>
            <motion.li className='link' onClick={(e)=>{setWindow([
              ["firebean","open",true],
              ["firebean","minimized",false],
            ]);}}><motion.span>Surf the web with Firebean</motion.span></motion.li>
            <motion.li className='link' onClick={(e)=>{setWindow([
              ["settings","open",true],
              ["settings","minimized",false],
            ]);}}><motion.span>Tweak your appearance</motion.span></motion.li>
            <motion.li className='link' onClick={(e)=>{setWindow([
              ["beanshell","open",true],
              ["beanshell","minimized",false],
            ]);}}><motion.span>Run commands from beanshell</motion.span></motion.li>
            <motion.li className='link' onClick={(e)=>{setWindow([
              ["explorer","open",true],
              ["explorer","minimized",false],
            ]);}}><motion.span>Explore the beansite files</motion.span></motion.li>
          </motion.ul>
      </Window>
      <Window
        id="changelog"
        closed={!settings.defaultOpenApps["changelog"]}
        y={240}
        icon={Icons.text}
        title="Changelog">
          <Changelog/>
      </Window>
      <Window
        id="beanpowered"
        y={10}
        x={360}
        height={450}
        closed={!settings.defaultOpenApps["beanpowered"]}
        width={450*(16/10)}
        customContentBoxStyling={{overflow:"hidden"}}
        // closed
        icon={Icons.beanpowered}
        title="Beanpowered">
          <Beanpowered/>
      </Window>
      <Window
        id="beanforged"
        y={20}
        x={370}
        height={450}
        width={450*(16/10)}
        closed={!settings.defaultOpenApps["beanforged"]}
        customContentBoxStyling={{overflow:"hidden"}}
        // maximized
        // darkIcon
        icon={Icons.beanforged}
        title="Beanforged">
          <Beanforged/>
      </Window>
      <Window
        id="blog"
        y={30}
        x={380}
        height={450}
        width={450*(16/10)}
        closed={!settings.defaultOpenApps["blog"]}
        customContentBoxStyling={{overflow:"hidden"}}
        icon={Icons.text}
        title="Blog">
          <Blog/>
      </Window>
      <Window
        id="settings"
        y={20}
        x={20}
        height={520*(10/16)}
        width={520}
        icon={Icons.configApplication}
        closed={!settings.defaultOpenApps["settings"]}
        title="Settings">
          <Settings/>
      </Window>
      <Window
        id="beanshell"
        y={30}
        x={30}
        height={450}
        width={450*(16/10)}
        closed={!settings.defaultOpenApps["beanshell"]}
        icon={Icons.beanshell}
        title="Beanshell">
          <Beanshell/>
      </Window>
      <Window
        id="explorer"
        y={40}
        x={40}
        height={350}
        width={350*(16/10)}
        closed={!settings.defaultOpenApps["explorer"]}
        icon={Icons.fileManager}
        title="Explorer">
          <Explorer/>
      </Window>
      {/* @ts-ignore */}
      <Notepad/><Photos/><Properties/>
      <Window
        id="debug"
        y={60}
        x={60}
        closed
        icon={Icons.fileManager}
        title="Debug">
          <Debug/>
      </Window>
      <Window
        id="taskmgr"
        y={70}
        x={70}
        height={350}
        width={350*(3/2)}
        closed={!settings.defaultOpenApps["taskmgr"]}
        icon={Icons.taskManager}
        title="Task Manager">
          <TaskMgr/>
      </Window>
      <Window
        id="beancord"
        y={90}
        x={90}
        height={350}
        width={350*(16/10)}
        // customContentBoxStyling={{background:"#2e3036"}}
        closed={!settings.defaultOpenApps["beancord"]}
        icon={Icons.beancord}
        title="Beancord">
          <Beancord/>
      </Window>
      <Window
        id="firebean"
        y={100}
        x={100}
        height={350}
        width={350*(16/10)}
        // customContentBoxStyling={{background:"#2e3036"}}
        closed={!settings.defaultOpenApps["firebean"]}
        customContentBoxStyling={{
          height:"calc(100% - 10px - 18px - 2px - (1.75rem * 2))",
          overflow:"visible",
        }}
        icon={Icons.firebean}
        title="Firebean">
          <Firebean/>
      </Window>
      <Window
        id="modstore"
        y={110}
        x={110}
        height={350}
        width={350*(16/10)}
        // customContentBoxStyling={{background:"#2e3036"}}
        closed={!settings.defaultOpenApps["modstore"]}
        icon={Icons.controlPanel}
        title="Mod Store">
          <ModStoreClient/>
      </Window>

        
      {/*//! errors */}
      <Window
        id="protectionError"
        y={(window.innerHeight/2)-(180/2)-(42/4)}
        x={(window.innerWidth/2)-(480/2)}
        height={180}
        width={480}
        closed
        includeButton={[true,false,false]}
        icon={Icons.warning}
        title="Error">
          <motion.div className='errorWrapper'>
            <motion.div className='ewL'>
              <Icon icon="warning" className="errorIcon"/>
            </motion.div>
            <motion.div className='ewR'>
              <motion.p>An error occurred while deleting file</motion.p>
              <motion.p>The media is write protected.</motion.p>
            </motion.div>
          </motion.div>
          <motion.div className='error_actionWrapper'>
            <motion.button onClick={(e)=>{
              setWindow([["protectionError","open",false],]);
            }}>OK</motion.button>
          </motion.div>
      </Window>
      <Window
        id="resetError"
        y={(window.innerHeight/2)-(180/2)-(42/4)}
        x={(window.innerWidth/2)-(480/2)}
        height={180}
        width={480}
        closed={!settings.isReset||false}
        includeButton={[true,false,false]}
        icon={Icons.info}
        title="Settings Reset">
          <motion.div className='errorWrapper'>
            <motion.div className='ewL'>
              <Icon icon="info" className="errorIcon"/>
            </motion.div>
            <motion.div className='ewR'>
              <motion.p>Your settings have been reset</motion.p>
              <motion.p style={{fontSize:".875rem",opacity:".65"}}>If this was not manually done, your settings were most likely outdated and lacking in important keys.</motion.p>
            </motion.div>
          </motion.div>
          <motion.div className='error_actionWrapper'>
            {settings.oldSettings?<motion.button onClick={(e)=>{
              navigator.clipboard.writeText(JSON.stringify(settings.oldSettings,null,4))
                .catch(err=>{console.error('Failed to copy text: ',err);});
              }}>Copy Old Settings (as JSON)</motion.button>:null}
            <motion.button onClick={(e)=>{
              setSettings([["isReset",false],["oldSettings",{}],]);
              setWindow([["resetError","open",false],]);
            }}>OK</motion.button>
          </motion.div>
      </Window>

      <ModStoreWinProvider/>
      <ModStoreCSSProvider/>
    </Beansite81>
  </>);
}
export default App;