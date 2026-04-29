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
    },{
      name:"1v1.lol",
      src:"/g/src/1v1/index.html",
      id:"1v1lol",
      working:true,
    },{
      name:"Baldi's Basics",
      src:"/g/src/bb.html",
      id:"baldis",
      working:true,
    },{
      name:"BitLife",
      src:"/g/src/bl.html",
      id:"bl",
      working:true,
    },{
      name:"FNAF",
      src:"/g/src/5nf.html",
      id:"fnaf",
      working:true,
    },{
      name:"Fallout",
      src:"/g/src/fo.html",
      id:"fallout1",
      working:true,
    },{
      name:"Tomb of the Mask",
      src:"/g/src/totm.html",
      id:"totm",
      working:true,
    },{
      name:"Run 3",
      src:"/g/src/r3.html",
      id:"run3",
      working:true,
    },{
      name:"Snow Rider 3D",
      src:"/g/src/sr3d.html",
      id:"sr3d",
      working:true,
    },{
      name:"Retro Bowl",
      src:"/g/src/rb.html",
      id:"retrob",
      working:true,
    },{
      name:"Super Mario 64",
      src:"/g/src/m64.html",
      id:"m64",
      working:true,
    },{
      name:"Quake 3",
      src:"/g/src/q3.html",
      id:"q3",
      working:true,
    },{
      name:"Subway Surfer's",
      src:"/g/src/ss.html",
      id:"subways",
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