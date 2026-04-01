import { lazy, useState, type ReactElement } from 'react';
import { Beansite81, Window } from './sdk/sdk';
import { Icons } from './sdk/components/Enum';
import { Helmet } from "react-helmet-async";
import { motion } from 'motion/react';
import { useAtom } from 'jotai';
import { ExpressDerivedWinModifierAtom } from './sdk/store';
const Settings=lazy(()=>import('./sdk/components/Settings'));
const Beanpowered=lazy(()=>import('./apps/beanpowered/Beanpowered.tsx'));
export const CHANGELOG:{
  versionName:string,
  releaseDate:string,
  comment:string,
  changes:string[],
}={
  versionName:"0.27.53",
  releaseDate:"Apr 1, 2026",
  comment: "",
  changes:[
    "TODO: Adapt Beanpowered codebase to use new games objects",
    "TODO: Implement Beanforged",
    "TODO: Add background presets",
    "TODO: Work on Dosbox pages",
    "Worked on homepage x5",
    "Version push 25 -> 27 because of undeployed large changes",
    "Reformatted Beansite 7's Beanpowered to work with typescript",
    "Added IFRameRenderer and HTMLRenderer (incomplete)",
    "Worked on homepage (which is nearly finished)",
    "Added ruffle emulator",
    "File Reorg",
    "Added ruffle pages",
    "Cleaned Changelog",
  ],
};
const App=({}):ReactElement=>{
  const[,setWindow]=useAtom(ExpressDerivedWinModifierAtom);
  return(<>
    <Helmet>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/assets/favicon_modern.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Beansite 8.1</title>
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
              ]);
            }}>Open All Windows</motion.button>
          <motion.button
            onClick={()=>{
              setWindow([
                ["win1","open",false],
                ["changelog","open",false],
                ["settings","open",false],
                ["beanpowered","open",false],
              ]);
            }}>Close All Windows</motion.button><br/>
          <motion.a href="/extwr">ExtWindowRenderer</motion.a>
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
        id="beanpowered"
        y={10}
        x={360}
        height={450}
        width={450*(16/10)}

        // closed
        icon={Icons.beanpowered}
        title="Beanpowered">
          <Beanpowered/>
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