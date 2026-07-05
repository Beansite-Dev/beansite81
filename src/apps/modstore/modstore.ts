import { Dexie, type EntityTable } from "dexie";
import { z } from "zod";
//@ts-expect-error
import * as csstree from 'csstree-validator';
const func=z.string().optional().refine((src)=>{
  try{new Function(src as string);return true;}
  catch(error){return false;}
});
export const options=z.object({
  name:z.string().min(2).max(100),
  description:z.string().max(256).optional(),
  type:z.enum(["text","number","boolean","select"]),
  value:z.union([z.string(),z.number(),z.boolean()]).optional(),
  // defaultValue:z.union([z.string(),z.number(),z.boolean()]).optional(),
  selectOptions:z.array(z.union([z.string(),z.number()])).optional(),
  onchange:func,
}).refine(
  (option)=>!(option.type==="select"&&(!option.selectOptions||option.selectOptions.length===0)),
  {message:"Select options must be provided for select type options"}
);
export type Ioptions=z.infer<typeof options>;
export const modstoreSchema=z.object({
  id:z.string(),
  author:z.email(),
  authorNick:z.string().optional(),
  source:z.url(),
  name:z.string().min(2).max(100),
  description:z.string().max(256).optional(),
  enabled:z.boolean().default(true),
  debug:z.boolean().optional(),
  permissions:z.object({
    useCustomCSS:z.boolean().optional().default(true),
    useCustomScripts:z.boolean().optional().default(false),
  }),
  tags:z.array(z.string()).optional(),
  scripts:z.object({
    preload:func,
    main:func,
    onchange:func,
  }).optional(),
  customCSS:z.string().optional().default("").refine((cssSrc)=>{try{
    const css=cssSrc.replace(/\u00a0/g,' ');
    const errors=csstree.validate(css);
    if(errors.length===0)return true;
    else return false;
  }catch(error){return false;}},{message:"Invalid full CSS string"}).optional(),
  options:z.array(options).optional(),
});
export type IModstore=z.infer<typeof modstoreSchema>;
export const defaultModstore:IModstore[]=[
  //?test mod
  // {
  //   id:"test-mod-1",
  //   author:"m1dnightgmrofficial@gmail.com",
  //   authorNick:"M1dnight",
  //   name:"Test Mod 1",
  //   description:"Just a simple test mod",
  //   source:"https://github.com/Beansite-Dev/beansite81",
  //   permissions:{useCustomCSS:true,useCustomScripts:true,},
  //   enabled:false,
  //   debug:true,
  //   tags:["Test","Tag1","Tag2"],
  //   scripts:{
  //     preload:`console.log("[test-mod-1] Hi from preload!")`,
  //     main:`console.log("[test-mod-1] Hi from main!")`,
  //     onchange:`console.log("[test-mod-1] super on change",newmod)`
  //   },
  //   customCSS:`
  //     body {
  //       color: red;
  //     }
  //   `,
  //   options:[
  //     {
  //       name:"Test Parameter",
  //       description:"just a test lol",
  //       type:"text",
  //       value:"",
  //       onchange:`console.log("[test-mod-1] on change ran for test param",newval)`
  //     },{
  //       name:"Test Parameter 2",
  //       description:"has default param",
  //       type:"number",
  //       value:9,
  //       onchange:`console.log("[test-mod-1] on change ran for test param 2",newmod)`
  //     },{
  //       name:"Test Parameter 3",
  //       description:"checkbox",
  //       type:"boolean",
  //       value:true,
  //       onchange:`console.log("[test-mod-1] on change ran for test param 3",newmod)`
  //     },{
  //       name:"Test Select",
  //       description:"cool",
  //       type:"select",
  //       value:"option 1",
  //       selectOptions:["option 1","option 2","option 3",],
  //       onchange:`console.log("[test-mod-1] on change ran for test param 4",newmod)`
  //     },
  //   ]
  // },
  {
    id:"rounded-windows",
    author:"m1dnightgmrofficial@gmail.com",
    authorNick:"M1dnight",
    name:"Rounded Windows",
    description:"Just like windows 11",
    source:"https://github.com/Beansite-Dev/beansite81",
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
  },
  {
    id:"translucent-windows",
    author:"m1dnightgmrofficial@gmail.com",
    authorNick:"M1dnight",
    name:"Translucent Windows",
    description:"Turns the contentbox translucent (experimental, does not support dark themes)",
    source:"https://github.com/Beansite-Dev/beansite81",
    permissions:{useCustomCSS:true,useCustomScripts:true,},
    enabled:false,
    debug:false,
    tags:["Window","Appearance"],
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
  },
];
export const modstoredb=new Dexie("MB81Mods") as Dexie &{mods:EntityTable<IModstore,"id">};
modstoredb.version(1).stores({mods:"++id,author,source,name,description,permissions,tags,scripts,customCSS",});
modstoredb.on('populate',async()=>{await modstoredb.mods.bulkPut(defaultModstore);});