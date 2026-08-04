import { useAtom } from "jotai";
import { useEffect, type ReactElement, useRef } from "react";
import { derivedModStoreWinAtom } from "./modstore";
import { Window } from "../../sdk/sdk";
const Win=({win,bounds}:{win:any;bounds?:any}):ReactElement=>{
  const setIframeRef=(node:HTMLIFrameElement|null)=>{if(node)node.srcdoc=win.component;};
  return(<Window
    icon={win.winData.icon}
    title={win.winData.title}
    id={win.winData.id}
    x={10}
    y={10}
    height={350}
    width={350*(16/10)}
    minimized={win.winData.minimized}
    bounds={bounds}
    closed={!win.winData.open}>
      <iframe
        ref={setIframeRef}
        className="modwiniframe"
        id={`${win.winData.id}-iframe`}/>
  </Window>);
};
export const ModStoreWinProvider=({bounds}:{bounds?:any}):ReactElement=>{
  const[modStoreWin]=useAtom(derivedModStoreWinAtom);
  return(<>{modStoreWin.map(win=><Win key={win.winData.id} {...{win,bounds}}/>)}</>);
};