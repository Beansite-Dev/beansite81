import { atom } from "jotai";
import type { Icons } from "./components/Enum";
import { z } from "zod";
// import { Window } from "./sdk";
export interface IWinObj{
  uuid:string;
  id:string;
  title:string;
  icon:string;
  focused:boolean;
  open:boolean;//|null;
  minimized:boolean;//|null;
  // component:typeof Window;
};
export const uniqueById=(items:IWinObj[])=>{
  const s=new Set();
  return items.filter((item)=>{
    const d=s.has(item.id);
    s.add(item.id);
    return !d;
  });
}
export const WinAtom=atom<IWinObj[]>([]);
export const DerivedWinAtom=atom(
  (get)=>get(WinAtom),
  (get,set,update:IWinObj[])=>set(WinAtom,uniqueById([...get(WinAtom),...update]))
);
export const DerivedWinModifierAtom=atom(
  // windows2[windows.findIndex((win)=>{return win===id;})]
  (get)=>get(WinAtom),
  (get,set,update:[string,keyof IWinObj,any])=>set(WinAtom,get(WinAtom).map((item:IWinObj)=>{
    if(item.id===update[0]){return{...item,[update[1]]: update[2]};}
    return item;
  }))
);
export const ExpressDerivedWinModifierAtom=atom(
  // windows2[windows.findIndex((win)=>{return win===id;})]
  (get)=>get(WinAtom),
  (get,set,update:[string,keyof IWinObj,any][])=>{
    update.forEach(x=>{
      set(WinAtom,get(WinAtom).map((item:IWinObj)=>{
        if(item.id===x[0]){return{...item,[x[1]]:x[2]};}
        return item;
      }))
    })
  }
);
export const validAppKeys=[
  "win1",
  "changelog",
  "settings",
  "beanpowered",
  "beanforged",
  "blog",
  "beanshell",
  "explorer",
  "notepad",
  "taskmgr",
  "beancord",
  "firebean",
  "modstore"
]as const;
export const SettingsAtomSchema=z.object({
  backgroundImage:z.string(),
  backgroundSize:z.union([z.literal("cover"),z.literal("contain"),z.number(),z.string()]),
  backgroundRepeat:z.union([z.literal("repeat"),z.literal("norepeat"),z.number(),z.string()]),
  theme:z.union([
    z.literal("default"),
    z.literal("lib"),
    z.literal("dark"),
    z.literal("red"),
    z.literal("orange"),
    z.literal("yellow"),
    z.literal("green"),
    z.literal("blue"),
    z.literal("purple"),
  ]),
  font:z.union([
    z.literal("segoe"),
    z.literal("tahoma"),
    z.literal("comic"),
    z.literal("time"),
    z.literal("mono")
  ]),
  defaultOpenApps:z.record(z.enum(validAppKeys),z.boolean()),
  closeConfirmation:z.boolean(),
  customCSS:z.string(),
  scale:z.number().optional(),
  isReset:z.boolean().optional(),
  oldSettings:z.object({}).passthrough().optional(),
});
export type ISettingsAtom=z.infer<typeof SettingsAtomSchema>;
const defaultSettings:ISettingsAtom={
  backgroundImage:"/wallpaper/1.jpg",
  backgroundSize:"cover",
  backgroundRepeat:"no-repeat",
  theme:"default",
  font:"segoe",
  closeConfirmation:true,
  customCSS:"/*Type in CSS Here*/",
  isReset:true,
  defaultOpenApps:{
    win1:true,
    changelog:true,
    settings:false,
    beanpowered:true,
    beanforged:false,
    blog:false,
    beanshell:false,
    explorer:false,
    notepad:false,
    taskmgr:false,
    beancord:false,
    firebean:false,
    modstore:false,
  },
};
const loadSettings=():ISettingsAtom=>{
  const raw=localStorage.getItem("mb81-settings");
  if(!raw) return defaultSettings;
  const parsed=JSON.parse(raw);
  const result=SettingsAtomSchema.safeParse(parsed);
  if(result.success) return result.data;
  console.warn("Settings failed validation:",result.error.issues);
  return {...defaultSettings,isReset:true,oldSettings:parsed};
}
export const SettingsAtom=atom<ISettingsAtom>(loadSettings());
export const DerivedSettingsAtom=atom(
  (get)=>get(SettingsAtom),
  (get,set,update:[keyof ISettingsAtom,ISettingsAtom[keyof ISettingsAtom]])=>set(SettingsAtom,{...get(SettingsAtom),[update[0]]:update[1],}as ISettingsAtom),);
export const ExpressDerivedSettingsAtom=atom(
  (get)=>get(SettingsAtom),
  (get,set,update:[keyof ISettingsAtom,ISettingsAtom[keyof ISettingsAtom]][])=>
    {update.forEach(x=>{set(SettingsAtom, {...get(SettingsAtom),[x[0]]:x[1],}as ISettingsAtom);});},);