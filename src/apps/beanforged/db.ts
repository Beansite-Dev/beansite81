import { Dexie, type EntityTable } from "dexie";
import { generateId } from "../../sdk/Lib";
interface IsavedInstances {
  id:string;
  name:string;
  isFile?:boolean;
  src:string|Blob;
  icon:string;
  version:string;
}
const bfdb=new Dexie("BeanforgedDB") as Dexie &{
  savedInstances:EntityTable<IsavedInstances,"id">};
bfdb.version(1).stores({
  savedInstances:"++id,name,isFile,src,version,icon",});
export const defaultInstances:IsavedInstances[]=[
  {
    id:"pksmprec",
    name:"pkSmp: A Beansite Partner (Recommended Client)",
    isFile:false,
    src:"/g/bfsrc/pk_rec.html",
    version:"1.12.2",
    icon:"/apps/beanforged/pk.png",
  },{
    id:"e152-102522-ec22w43ac",
    name:"Eaglercraft 1.5.2",
    isFile:false,
    src:"/g/bfsrc/e152-102522-ec22w43ac.html",
    version:"1.5.2",
    icon:"/apps/beanforged/eagler.png",
  },{
    id:"e188-122324-ecxu46-wasm-gc",
    name:"Eaglercraft 1.8.8",
    isFile:false,
    src:"/g/bfsrc/e188-122324-ecxu46-wasm-gc.html",
    version:"1.8.8",
    icon:"/apps/beanforged/eagler.png",
  },{
    id:"res188-40",
    name:"Resent Client 1.8.8",
    isFile:false,
    src:"/g/bfsrc/res188-40.html",
    version:"1.8.8",
    icon:"/apps/beanforged/eagler.png",
  },
];
export type { IsavedInstances };
export { bfdb };