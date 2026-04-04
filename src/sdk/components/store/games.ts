import ruf from "./ruf.json";
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
  gen:[
    {
      name:"Slope",
      src:"/g/src/slp/index.html",
      id:"slp",
      working:true,
    },{
      name:"Cookie Clicker",
      src:"/g/src/cc/index.html",
      id:"cc",
      working:true,
    },{
      name:"Celeste",
      src:"/g/src/cel/index.html",
      id:"cel",
      working:true,
    },{
      name:"Gunspin",
      src:"/g/src/gs/index.html",
      id:"gs",
      working:true,
    },
  ],
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