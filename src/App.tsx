import { useState, type ReactElement } from 'react';
import { Beansite81, Window } from './sdk/sdk';
import { Icons } from './sdk/components/Enum';
export const CHANGELOG:{
  versionName:string,
  releaseDate:string,
  comment:string,
  changes:string[],
}={
  versionName:"0.8.62",
  releaseDate:"Feb 9, 2026",
  comment: "Quick checkpoint",
  changes:[
    "TODO: fix minimize animations by using animate presence",
    "WIP: Addding window opening",
    "Fixed jotai state by implementing derived atom",
    "Taskbar implementation has begun",
    "Added changelog",
    "SDK Tweaks",
    "Fixed click to bring window to front",
    "Added icon starters to taskbar and icons",
    "Fixed start icon",
    "Added taskbar styling fixes",
    "Fixed drag to maximize",
    "Deleted more boilerplate code",
    "Tweak tsconfig",
    "Added changelog comment",
    "Code reorginization",
    "Fixed taskbar update issues through derived atoms",
    "Added closing/minimize functionality to windows",
  ],
}
const App=({}):ReactElement=>{
  return(<>
    <Beansite81>
      <Window
        id="win1"
        icon={Icons.configApplication}
        title="Test Win 1">
          
      </Window>
      <Window
        id="win2"
        y={240}
        icon={Icons.configApplication}
        title="Test Win 2">
          
      </Window>
    </Beansite81>
  </>);
}
export default App;