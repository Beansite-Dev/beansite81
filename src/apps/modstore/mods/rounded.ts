import type { IModstore } from "../modstore";
export const rounded:IModstore={
  id:"rounded",
  author:"m1dnightgmrofficial@gmail.com",
  authorNick:"M1dnight",
  name:"Rounded",
  description:"Rounds practically everything (fork of rounded windows)",
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
    .Window[data-max=true]{
      border-radius: 0 !important;
    }
    .WinContents {
      border-radius: var(--rounded-windows-content-radius);
    }
    .Window .Button {
      border-bottom-left-radius: var(--rounded-windows-content-radius);
      border-bottom-right-radius: var(--rounded-windows-content-radius);
    }
    .DesktopIcon {
      border-radius: var(--rounded-windows-radius);
    }
    .startMenuItem {
      border-radius: var(--rounded-windows-radius);
    }
    .item .preview {
      border-radius: var(--rounded-windows-radius);
    }
    button {
      border-radius: var(--rounded-windows-radius);
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