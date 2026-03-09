import { useState, type ReactElement } from 'react';
import { Beansite81, Window } from './sdk/sdk';
import { Icons } from './sdk/components/Enum';
import { Helmet } from "react-helmet-async";
import { motion } from 'motion/react';
import { Settings } from './sdk/components/Settings';
import { useAtom } from 'jotai';
import { ExpressDerivedWinModifierAtom } from './sdk/store';
export const CHANGELOG:{
  versionName:string,
  releaseDate:string,
  comment:string,
  changes:string[],
}={
  versionName:"0.15.02",
  releaseDate:"Mar 9, 2026",
  comment: "tweaky time//checkpoint 6",
  changes:[
    "TODO: Fix maximization animation",
    "TODO: Work on clock dialog by adding calender",
    "TODO: Add localStorage to settings",
    "Quick typefixes in games.ts",
    "Taskbar modification",
    "Fixed firebase hosting and routing",
    "Updated lib import paths (remnant from 7)",
    "More typing stuff",
    "Updated stores from 7 to use typescript",
    "Updated types",
    "Added mono font",
    "Created ThemeLib",
    "Used ThemeLib to create a dark mode",
    "Updated default theme to use ThemeLib",
    "Fixed issues in error boundary",
    "Fixed more styling within windows and taskbars",
    "Cleaned changelog",
  ],
}
const App=({}):ReactElement=>{
  const[_,setWindow]=useAtom(ExpressDerivedWinModifierAtom);
  return(<>
    <Helmet>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/assets/favicon_modern.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Beansite 8.1</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
                ["changelog","open",true],
                ["settings","open",true],
                ["win1","minimized",false],
                ["changelog","minimized",false],
                ["settings","minimized",false],
              ]);
            }}>Open All Windows</motion.button><br/>
      </Window>
      <Window
        id="changelog"
        y={240}
        icon={Icons.text}
        title="Changelog">
          <motion.h1>{CHANGELOG.versionName} - {CHANGELOG.releaseDate}</motion.h1>
          <motion.p>{CHANGELOG.comment}</motion.p>
          <motion.ul>
            {CHANGELOG.changes.map((change,index)=>(
              <motion.li key={index}>{change}</motion.li>
            ))}
          </motion.ul>
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
    </Beansite81>
  </>);
}
export default App;