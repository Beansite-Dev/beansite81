import { useState, type ReactElement } from 'react';
import { Beansite81, Window } from './sdk/sdk';
import { Icons } from './sdk/components/Enum';
const App=({}):ReactElement=>{
  return(<>
    <Beansite81>
      <Window
        id="win1"
        icon={Icons.configApplication}
        title="Test Win 1">
          
      </Window>
    </Beansite81>
  </>);
}
export default App;