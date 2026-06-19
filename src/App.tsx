import { lazy, useEffect, useState, type ReactElement } from 'react';
import { Beansite81, Window } from './sdk/sdk';
import { Icons, IconsOld } from './sdk/components/Enum';
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
const Debug=lazy(()=>import('./apps/debug/Debug.tsx'));
const TaskMgr=lazy(()=>import('./apps/taskmgr/TaskMgr.tsx'));
const Explorer=lazy(()=>import('./apps/beanshell/explorer/Explorer.tsx'));
const Notepad=lazy(()=>import('./apps/beanshell/notepad/Notepad.tsx'));
const Photos=lazy(()=>import('./apps/beanshell/photos/Photos.tsx'));
const Beancord=lazy(()=>import('./apps/beancord/Beancord.tsx'));
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
    "TODO: Finish Explorer",
    "TODO: Add Task Manager",
    "TODO: Work on Dosbox pages",
    "TODO: Add context menu functionality",
    "TODO: Add header action buttons",
    "TODO: Add files to filesystem",
    "TODO: Add property viewing to explorer",
    "Added context menu to file explorer",
    "Added file actions",
    "Fixed incorrect language reporting on github linguist",
    "Added advanced file selection",
    "Added Beancord using https://widgetbot.io (login may not work)",
    "Bugfix: Fixed IIcons type not being exported",
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
          <motion.span className="sub">commited on {commitData.commit.committer.date} by {commitData.author?.full_name}/{commitData.author?.username}</motion.span>
        </motion.li>))}
      </motion.ul>
      :<motion.p>Received error: {previousCommits}</motion.p>}
  </>);
}
const App=({}):ReactElement=>{
  const[settings,]=useAtom(SettingsAtom);
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
      <Notepad/><Photos/>
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
        closed={!settings.defaultOpenApps["beancord"]}
        icon={Icons.text}
        title="Beancord">
          {/* @ts-ignore */}
          <Beancord/>
      </Window>
    </Beansite81>
  </>);
}
export default App;