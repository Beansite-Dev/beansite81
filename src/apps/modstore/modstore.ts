import { Dexie, type EntityTable, type Transaction } from "dexie";
import { z } from "zod";
//@ts-expect-error
import * as csstree from 'csstree-validator';
import { roundedWindows } from "./mods/rounded-windows";
import { beanshellCustomThemer } from "./mods/beanshell-custom-theme";
import { translucentWindows } from "./mods/translucent-windows";
import { customThemer } from "./mods/custom-themer";
import * as acorn from "acorn";
import { atom } from "jotai";
import type { IWinObj } from "../../sdk/store";
import type { ReactNode } from "react";
const func=z.string().optional().refine((src)=>{
  if(src===undefined)return true;
  try{
    acorn.parse(src,{ecmaVersion:"latest",allowAwaitOutsideFunction:true});
    return true;
  }catch(error){
    console.warn("[modstore] script failed to parse:",error);
    return false;
  }
});
export const options=z.object({
  name:z.string().min(2).max(100),
  description:z.string().max(256).optional(),
  type:z.enum(["text","number","boolean","select","color"]),
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
  roundedWindows,
  translucentWindows,
  beanshellCustomThemer,
  // customThemer,
];
export const modstoredb=new Dexie("MB81Mods") as Dexie &{mods:EntityTable<IModstore,"id">};
modstoredb.version(Number(import.meta.env.VITE_MODSTORE_DB_VER)).stores({mods:"++id,author,source,name,description,permissions,tags,scripts,customCSS",});
modstoredb.version(Number(import.meta.env.VITE_MODSTORE_DB_VER)+1).stores({mods:"++id,author,source,name,description,permissions,tags,scripts,customCSS",}).upgrade(async(tx:Transaction)=>{
  await tx.table("mods").bulkPut(defaultModstore);
});
modstoredb.on('populate',async()=>{await modstoredb.mods.bulkPut(defaultModstore);});
declare interface modStoreWindowObject {
  winData:Exclude<IWinObj,"focused">;
  component:ReactNode;
}
export const modStoreWinAtom=atom<modStoreWindowObject[]>([]);
export const uniqueById=(items:modStoreWindowObject[])=>{
  const s=new Set();
  return items.filter((item)=>{
    const d=s.has(item.winData.id);
    s.add(item.winData.id);
    return !d;
  });
}
export const derivedModStoreWinAtom=atom(
  (get)=>get(modStoreWinAtom),
  (get,set,update:modStoreWindowObject[])=>set(modStoreWinAtom,uniqueById([...get(modStoreWinAtom),...update]))
);