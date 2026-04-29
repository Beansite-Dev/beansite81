import ruf from "./ruf.json";
import gen from "./gen.json";
import type { CSSProperties } from "react";
console.table(ruf);
export interface IGame {
  id:string;
  name:string;
  src:string;
  gameSrc?:string;
  desc?:string;
  customBannerCSS?:CSSProperties;
  working:boolean;
  status?:string;
  vdate?:string;
}
interface IGames {
  ruf:IGame[];
  dos:IGame[];
  gen:IGame[];
}
const games:IGames={
  gen:gen.x,
  ruf:[
    ...Object.entries(ruf).map(([id,g])=>{
      return{
        id,
        name:g.name,
        gameSrc:`/g/ruf_src/${g.src}.swf`,
        src:`/g/ruf/${id}`,
        working:true,
      };
    }),
  ],
  dos:[],
};
export default games;