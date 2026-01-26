import { useState, type ReactElement } from 'react';
import { Beansite81, Window } from './sdk/sdk';
import { Icons } from './sdk/components/Enum';
export const CHANGELOG:{
  versionName:string,
  releaseDate:string,
  changes:string[],
}={
  versionName:"0.4.3",
  releaseDate:"Jan 25, 2026",
  changes:[
    "Fixed jotai state by implementing derived atom",
    "Taskbar implementation has begun",
    "Added changelog",
    "SDK Tweaks",
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