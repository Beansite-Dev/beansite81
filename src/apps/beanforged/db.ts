import { Dexie, type EntityTable } from "dexie";
interface IsavedInstances {
  id:string;
  isFile?:boolean;
  src:string;
  container?:string;
}
const bfdb=new Dexie("BeanforgedDB") as Dexie &{
  savedInstances:EntityTable<IsavedInstances,"id">};
bfdb.version(1).stores({
  savedInstances:"++id,isFile,src,container",});
export type { IsavedInstances };
export { bfdb };