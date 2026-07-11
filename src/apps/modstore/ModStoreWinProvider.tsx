import type { ReactElement } from "react";
  import parse from 'html-react-parser';
import type { IModstore } from "./modstore";
export const ModStoreWinProvider=({mod}:{mod:IModstore}):ReactElement=>{
  const ParserComponent=({content}:{content:string})=><div>{parse(content)}</div>;
  return(<>
    
  </>);
}