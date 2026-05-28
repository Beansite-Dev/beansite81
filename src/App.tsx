import { lazy, useEffect, useState, type ReactElement } from 'react';
import { Beansite81, Window } from './sdk/sdk';
import { Icons } from './sdk/components/Enum';
import { Helmet } from "react-helmet-async";
import { motion } from 'motion/react';
import { useAtom } from 'jotai';
import "./style.scss";
import { ExpressDerivedWinModifierAtom } from './sdk/store';
const Settings=lazy(()=>import('./sdk/components/Settings'));
const Beanpowered=lazy(()=>import('./apps/beanpowered/Beanpowered.tsx'));
const Beanforged=lazy(()=>import('./apps/beanforged/Beanforged.tsx'));
const Blog=lazy(()=>import('./apps/blog/Blog.tsx'));
const Beanshell=lazy(()=>import('./apps/beanshell/Beanshell.tsx'));
export const CHANGELOG:{
  versionName:string,
  releaseDate:string,
  comment:string,
  changes:string[],
}={
  versionName:import.meta.env.VITE_APP_VERSION,
  releaseDate:import.meta.env.VITE_APP_BUILD_DATE,
  comment: "sorry about the break",
  changes:[
    "TODO: Add Explorer",
    "TODO: Replace TestWin with a welcome message instead",
    "TODO: Work on Dosbox pages",
    "TODO: Add command line method to enable debug mode",
    "TODO: Create debug window",
    "TODO: Add taskbar preview",
    "TODO: Add files to filesystem",
    "Massive game drop",
    "Updated react to use swc",
    "Vite image optimizations",
    "Added git logging to changelog",
    "Seperated changelog into its own component",
    "Added stats",
    "Added environmental variables",
    "Added build/version info comments to index.html",
    "Migrated to vite 8",
    "Added Blog",
    "Cleaned Changelog",
    "Updated .sh/.bat files",
    "Fixed beanforged visual bugs",
    "Added beanpowered tooltip",
    "Added desktop tooltip",
    "Beanforged button nesting bug fixed",
    "Window icon styling fixed",
    "Started beanshell work",
    "Added beanshell command history",
    "Added basic commands to beanshell",
    "Fixed arrow key navigation in beanshell",
    "Added nano editor basics",
    "Introduced new pkSmp client",
    "Added file system to beanshell",
    "Fixed desktop imbalance bug",
    "Added command line directory navigation to beanshell",
    "Updated nano to use local file system",
    "Added cat, tac, and mkdir",
    "Repushed date",
    "Added touch, stat",
    "Fixed losing state on minimize in beanshell",
    "Added text to taskbar preview",
    "Added exe opening",
    "Switched to hash router",
    "Added 404 page",
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
        icon={Icons.configApplication}
        title="Test Win 1">
          <motion.h1>Test Window</motion.h1>
          <motion.h2>Debug</motion.h2>
          <motion.p>Check game win</motion.p>
          <motion.input id="checkwin" type="text" />
          <motion.button
            onClick={()=>{
              const input=document.getElementById("checkwin");
              if(input)window.open(
                (input as HTMLInputElement).value,
                "TEST WINDOW - BEANSITE 81 GAMELOADER",
                "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=640,height=360,top=100,left=100");
            }}>Submit</motion.button><br/><br/>
          <motion.button
            onClick={()=>{
              setWindow([
                ["win1","open",true],
                ["win1","minimized",false],
                ["changelog","open",true],
                ["changelog","minimized",false],
                ["settings","open",true],
                ["settings","minimized",false],
                ["beanpowered","open",true],
                ["beanpowered","minimized",false],
                ["beanforged","open",true],
                ["beanforged","minimized",false],
                ["blog","open",true],
                ["blog","minimized",false],
                ["beanshell","open",true],
                ["beanshell","minimized",false],
              ]);
            }}>Open All Windows</motion.button>
          <motion.button
            onClick={()=>{
              setWindow([
                ["win1","open",false],
                ["changelog","open",false],
                ["settings","open",false],
                ["beanpowered","open",false],
                ["beanforged","open",false],
                ["blog","open",false],
                ["beanshell","open",false],
              ]);
            }}>Close All Windows</motion.button><br/>
          <motion.a href="/#/extwr">ExtWindowRenderer</motion.a>
      </Window>
      <Window
        id="changelog"
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
        customContentBoxStyling={{overflow:"hidden"}}
        closed
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
        customContentBoxStyling={{overflow:"hidden"}}
        closed
        icon={Icons.text}
        title="Blog">
          <Blog/>
      </Window>
      <Window
        id="settings"
        y={20}
        x={20}
        closed
        icon={Icons.configApplication}
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
        closed
        icon={Icons.beanshell}
        title="Beanshell">
          {/* @ts-ignore */}
          <Beanshell/>
      </Window>
    </Beansite81>
  </>);
}
export default App;