import { useState, type ReactElement } from 'react';
import { Beansite81, Window } from './sdk/sdk';
import { Icons } from './sdk/components/Enum';
import { Helmet } from "react-helmet-async";
import { motion } from 'motion/react';
import { Settings } from './sdk/components/Settings';
export const CHANGELOG:{
  versionName:string,
  releaseDate:string,
  comment:string,
  changes:string[],
}={
  versionName:"0.10.22",
  releaseDate:"Feb 15, 2026",
  comment: "lots of work",
  changes:[
    "TODO: Fix/test initial maximized script",
    "TODO: remove animation if window is initially closed/minimized",
    "TODO: Add more themes",
    "TODO: Fix cors issues with backend server (if possible)",
    "Deployed to firebase and vercel",
    "Added time",
    "Added settings menu",
    "Added settings atoms/derived atoms",
    "Added simple themeing to sdk",
    "Fixed initial closed/minimized scripts",
    "Bumped version number",
    "Progressed on backend server",
    "Added changelog",
    "Updated lib",
    "Added window opening",
    "Cleaned changelog",
  ],
}
const App=({}):ReactElement=>{
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
            }}>Submit</motion.button><br/>
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