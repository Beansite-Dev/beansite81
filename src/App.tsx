import { lazy, useEffect, useState, type ReactElement } from 'react';
import { Beansite81, Window } from './sdk/sdk';
import { Icon, Icons, IconsOld } from './sdk/components/Enum';
import { Helmet } from "react-helmet-async";
import { motion } from 'motion/react';
import { useAtom } from 'jotai';
import "./style.scss";
import { ExpressDerivedWinModifierAtom, SettingsAtom } from './sdk/store';
const Settings=lazy(()=>import('./sdk/components/Settings'));
const Beanpowered=lazy(()=>import('./apps/beanpowered/Beanpowered.tsx'));
const Beanforged=lazy(()=>import('./apps/beanforged/Beanforged.tsx'));
const Blog=lazy(()=>import('./apps/blog/Blog.tsx'));
const Beanshell=lazy(()=>import('./apps/beanshell/Beanshell.tsx'));
const Beancord=lazy(()=>import('./apps/beancord/Beancord.tsx'));
const Debug=lazy(()=>import('./apps/debug/Debug.tsx'));
const TaskMgr=lazy(()=>import('./apps/taskmgr/TaskMgr.tsx'));
const Firebean=lazy(()=>import('./apps/firebean/Firebean.tsx'));
const Explorer=lazy(()=>import('./apps/beanshell/explorer/Explorer.tsx'));
const Notepad=lazy(()=>import('./apps/beanshell/notepad/Notepad.tsx'));
const Photos=lazy(()=>import('./apps/beanshell/photos/Photos.tsx'));
const Properties=lazy(()=>import('./apps/beanshell/explorer/properties/Properties.tsx'));
export const CHANGELOG:{
  versionName:string,
  releaseDate:string,
  comment:string,
  changes:string[],
}={
  versionName:import.meta.env.VITE_APP_VERSION,
  releaseDate:import.meta.env.VITE_APP_BUILD_DATE,
  comment: "summer grind begins",
  changes:[
    "TODO: Add Task Manager",
    "TODO: Work on Dosbox pages",
    "TODO: Add renaming to explorer",
    "TODO: Add Beanhelper (Chat)",
    "Added context menu to file explorer",
    "Added file actions",
    "Fixed incorrect language reporting on github linguist",
    "Added advanced file selection",
    "Added Beancord using https://widgetbot.io",
    "Bugfix: Fixed IIcons type not being exported",
    "Fixed bash/batch files",
    "Added beancord logos",
    "Added beanord desktop icons and start menu icons",
    "Added guest mode to beancord",
    "Added copying and pasting",
    "Added file deletion",
    "Added error messages",
    "Added window selective titlebar button display",
    "Added icon component to enum",
    "Added backbone for properties window",
    "Added types and modification dates to explorer",
    "Added header to explorer list",
    "Added explorer header section outline",
    "Added properties window with full function",
    "Added functions for parsing custom names and icons for file types",
    "Added more icons",
    "Added basic header functionality to explorer",
    "Finished explorer",
    "Added a shortcut icon",
    "Quickfix: update batch file",
    "Updated beancord welcome channel",
    "Fixed beancord border radius issue",
    "Fixed explorer selection issues",
    "Bumped Date",
    "Added shortcuts to welcome window",
    "Added fallback for git deploy logs",
    "Fully added firebean",
    "Fixed tab spotaneous unload/refusal bugs from 7",
    "Quickfix: fixed styling issues with explorer and beancord",
    "Officially repushed and redeployed",
    "Updated desktop, welcome window, and start menu shortcuts",
    "Added more icons to enum",
  ],
};
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
  const[settings,]=useAtom(SettingsAtom);
  const[,setWindow]=useAtom(ExpressDerivedWinModifierAtom);
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
        icon={Icons.configApplication}
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
        icon={Icons.configApplication}
        closed={!settings.defaultOpenApps["settings"]}
        title="Settings">
          {/* @ts-ignore */}
          <Settings />
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
          {/* @ts-ignore */}
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
          {/* @ts-ignore */}
          <Explorer/>
      </Window>
      {/* @ts-ignore */}
      <Notepad/><Photos/><Properties/>
      <Window
        id="debug"
        y={60}
        x={60}
        closed={!settings.defaultOpenApps["debug"]}
        icon={Icons.fileManager}
        title="Debug">
          {/* @ts-ignore */}
          <Debug/>
      </Window>
      <Window
        id="taskmgr"
        y={70}
        x={70}
        height={350}
        width={350*(16/10)}
        closed={!settings.defaultOpenApps["taskmgr"]}
        icon={Icons.taskManager}
        title="Task Manager">
          {/* @ts-ignore */}
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
          {/* @ts-ignore */}
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
    </Beansite81>
  </>);
}
export default App;