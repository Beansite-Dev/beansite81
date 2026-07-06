import type { IModstore } from "../modstore";
export const translucentWindows:IModstore={
  id:"translucent-windows",
  author:"m1dnightgmrofficial@gmail.com",
  authorNick:"M1dnight",
  name:"Translucent Windows",
  description:"Turns the contentbox translucent (experimental, does not support dark themes)",
  source:"https://github.com/Beansite-Dev/beansite81/tree/main/src/apps/modstore/mods/translucent-windows.ts",
  permissions:{useCustomCSS:true,useCustomScripts:true,},
  enabled:false,
  debug:false,
  tags:["Window","Appearance","Experimental"],
  customCSS:`
    .WinContents {
      background: transparent !important;
      border: none !important;
    }
    .WinContents button {
      background: transparent !important;
    }
    .WinContents textarea {
      background: transparent !important;
    }
    .WinContents.darkmodefix * {
      color: #fff;
    }
  `,
  scripts:{
    preload:`document.querySelectorAll(".WinContents").forEach(x=>(x.classList[mod.options[0].value?"add":"remove"])("darkmodefix"));`,
  },
  options:[
    {
      name:"Dark Mode Fix",
      description:"Fixes styling to look better with darker themes",
      type:"boolean",
      value:false,
      onchange:`document.querySelectorAll(".WinContents").forEach(x=>(x.classList[newval?"add":"remove"])("darkmodefix"));`
    }
  ]
};