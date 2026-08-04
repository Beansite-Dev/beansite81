//visual-filter.ts
import type { IModstore, Ioptions } from "../modstore";
type FilterUnit="px"|""|"deg";
const filters:{
key:string,
label:string,
unit:FilterUnit,
default:number,
description:string,
}[]=[
  {key:"blur",label:"Blur",unit:"px",default:0,description:"Blur strength in pixels (0-50)"},
  {key:"brightness",label:"Brightness",unit:"",default:1,description:"Brightness multiplier (0-2, init 1)"},
  {key:"contrast",label:"Contrast",unit:"",default:1,description:"Contrast multiplier (0-2, init 1)"},
  {key:"grayscale",label:"Grayscale",unit:"",default:0,description:"Grayscale amount (0-1)"},
  {key:"hue-rotate",label:"Hue Rotate",unit:"deg",default:0,description:"Hue rotation in degrees (0-360)"},
  {key:"invert",label:"Invert",unit:"",default:0,description:"Invert amount (0-1)"},
  {key:"saturate",label:"Saturate",unit:"",default:1,description:"Saturation multiplier (0-3, init 1)"},
  {key:"sepia",label:"Sepia",unit:"",default:0,description:"Sepia amount (0-1)"},
];
export const visualFilters:IModstore={
  id:"visual-filter",
  author:"m1dnightgmrofficial@gmail.com",
  authorNick:"M1dnight",
  name:"Visual Filters",
  description:"Have a little fun with standard CSS filters",
  source:"https://github.com/Beansite-Dev/beansite81/tree/main/src/apps/modstore/mods/beanshell-custom-themer.ts",
  permissions:{useCustomCSS:true,useCustomScripts:true,},
  enabled:false,
  debug:false,
  tags:["Appearance","Styling"],
  customCSS:`
    .cssfilter{
      height:100dvh;
      width:100dvw;
      position:fixed;
      top:50%;
      left:50%;
      translate:-50% -50%;
      z-index:999;
      pointer-events:none;
      user-select:none;
      background:transparent;
      backdrop-filter:${filters.map(f=>`var(--vf-${f.key})`).join(" ")};
      -webkit-backdrop-filter:${filters.map(f=>`var(--vf-${f.key})`).join(" ")};
    }
  `,
  scripts:{
    preload:`
      if(!document.querySelector('.cssfilter')){
        var el=document.createElement('div');
        el.className='cssfilter';
        document.body.appendChild(el);
      }
      ${filters.map(f=>
        `document.documentElement.style.setProperty('--vf-${f.key}','${f.key}(${f.default}${f.unit})');`)
          .join("\n")}
    `,
  },
  options:filters.map((f)=>{return{
    name:f.label,
    description:f.description,
    type:"number",
    value:f.default,
    onchange:`document.documentElement.style.setProperty('--vf-${f.key}','${f.key}('+newval+'${f.unit})');`
  }})as Ioptions[],
};