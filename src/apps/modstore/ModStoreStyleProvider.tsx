import { useAtom } from "jotai";
import { type ReactElement } from "react";
import { createPortal } from "react-dom";
import { derivedModStoreCSSAtom } from "./modstore";
export const ModStoreCSSProvider=():ReactElement=>{
  const[modStoreCSS]=useAtom(derivedModStoreCSSAtom);
  return(<>{modStoreCSS.map(({id,css})=>createPortal(<style key={id}>{css}</style>,document.head))}</>);
};