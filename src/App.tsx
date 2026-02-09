import { useState, type ReactElement } from 'react';
import { Beansite81, Window } from './sdk/sdk';
import { Icons } from './sdk/components/Enum';
import { Helmet } from "react-helmet-async";
export const CHANGELOG:{
  versionName:string,
  releaseDate:string,
  comment:string,
  changes:string[],
}={
  versionName:"0.8.82",
  releaseDate:"Feb 9, 2026",
  comment: "Quick checkpoint",
  changes:[
    "TODO: set up firebase hosting",
    "TODO: fix minimize animations by using animate presence",
    "Added window opening",
    "Quick react-helmet-async implementation",
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