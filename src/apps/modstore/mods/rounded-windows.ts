import type { IModstore } from "../modstore";
export const roundedWindows:IModstore={
  id:"rounded-windows",
  author:"m1dnightgmrofficial@gmail.com",
  authorNick:"M1dnight",
  name:"Rounded Windows",
  description:"Just like windows 11",
  source:"https://github.com/Beansite-Dev/beansite81/tree/main/src/apps/modstore/mods/rounded-windows.ts",
  permissions:{useCustomCSS:true,useCustomScripts:true,},
  enabled:false,
  debug:false,
  tags:["Window","Appearance"],
  scripts:{
    preload:`
      document.documentElement.style.setProperty('--rounded-windows-radius','8px');
      document.documentElement.style.setProperty('--rounded-windows-content-radius','4px');
    `,
  },
  customCSS:`
    .Window {
      border-radius: var(--rounded-windows-radius);
    }
    .WinContents {
      border-radius: var(--rounded-windows-content-radius);
    }
    .Window .Button {
      border-bottom-left-radius: var(--rounded-windows-content-radius);
      border-bottom-right-radius: var(--rounded-windows-content-radius);
    }
  `,
  options:[
    {
      name:"Window Radius",
      description:"Radius of the window (in px)",
      type:"number",
      value:"8",
      onchange:`document.documentElement.style.setProperty('--rounded-windows-radius',newval+'px');`
    },
    {
      name:"Window ContentBox Radius",
      description:"Radius of the window contentbox (in px)",
      type:"number",
      value:"4",
      onchange:`document.documentElement.style.setProperty('--rounded-windows-content-radius',newval+'px');`
    },
  ]
};