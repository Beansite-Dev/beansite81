import { Dexie, type EntityTable } from "dexie";
import { z } from "zod";
//@ts-expect-error
import * as csstree from 'csstree-validator';
const func=z.string().optional().default(`()=>{}`).refine((src)=>{
  try{new Function(src);return true;}
  catch(error){return false;}
});
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
  }).optional(),
  customCSS:z.string().optional().default("").refine((cssSrc)=>{try{
    const css=cssSrc.replace(/\u00a0/g,' ');
    const errors=csstree.validate(css);
    if(errors.length===0)return true;
    else return false;
  }catch(error){return false;}},{message:"Invalid full CSS string"}).optional(),
  options:z.array(z.object({
    name:z.string().min(2).max(100),
    description:z.string().max(256).optional(),
    type:z.enum(["text","number","boolean","select"]),
    defaultValue:z.union([z.string(),z.number(),z.boolean()]).optional(),
    selectOptions:z.array(z.union([z.string(),z.number()])).optional(),
  }).refine(
    (option)=>!(option.type==="select"&&(!option.selectOptions||option.selectOptions.length===0)),
    {message:"Select options must be provided for select type options"}
  )).optional(),
});
export type IModstore=z.infer<typeof modstoreSchema>;
export const defaultModstore:IModstore[]=[
  {
    id:"test-mod-1",
    author:"m1dnightgmrofficial@gmail.com",
    authorNick:"M1dnight",
    name:"Test Mod 1",
    description:"Just a simple test mod",
    source:"https://github.com/Beansite-Dev/beansite81",
    permissions:{useCustomCSS:true,useCustomScripts:true,},
    enabled:false,
    debug:true,
    tags:["Test","Tag1","Tag2"],
    scripts:{
      preload:`console.log("Hi from preload!")`,
      main:`console.log("Hi from main!")`,
    },
    customCSS:`
      body {
        color: red;
      }
    `,
    options:[
      {
        name:"Test Parameter",
        description:"just a test lol",
        type:"text",
      },
    ]
  },{
    id:"broken-mod",
    author:"m1dnightgmrofficial@gmail.com",
    authorNick:"M1dnight",
    name:"Broken Mod",
    description:"Had an oopsie",
    source:"https://github.com/Beansite-Dev/beansite81",
    permissions:{useCustomCSS:true,useCustomScripts:true,},
    enabled:false,
    debug:true,
    tags:["Test","Tag1","Tag2"],
    scripts:{
      preload:`console.log("Hi from preload!") this will not work lol`,
      main:`console.log("Hi from main!")`,
    },
    customCSS:``,
    options:[
      {
        name:"Test Parameter",
        description:"just a test lol",
        type:"text",
      },
    ]
  },{
    id:"borringg",
    author:"m1dnightgmrofficial@gmail.com",
    authorNick:"M1dnight",
    name:"Boring Mod",
    description:"",
    source:"https://github.com/Beansite-Dev/beansite81",
    permissions:{useCustomCSS:true,useCustomScripts:true,},
    enabled:false,
    debug:true,
  }
];
export const modstoredb=new Dexie("MB81Mods") as Dexie &{mods:EntityTable<IModstore,"id">};
modstoredb.version(1).stores({mods:"++id,author,source,name,description,permissions,tags,scripts,customCSS",});
modstoredb.on('populate',async()=>{await modstoredb.mods.bulkPut(defaultModstore);});