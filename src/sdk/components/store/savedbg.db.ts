import { Dexie, type EntityTable } from "dexie";
interface IsavedBackgrounds {
  id:string;
  name:string;
  src:string|Blob;
}
const sbgdb=new Dexie("MB81SavedWallpapersDB") as Dexie &{
  saved:EntityTable<IsavedBackgrounds,"id">};
sbgdb.version(1).stores({
  saved:"++id,name,src",});
export const defaultBackgrounds:IsavedBackgrounds[]=[
  {
    id:"default1",
    name:"Leaves",
    src:"/wallpaper/1.jpg",
  },
];
export type { IsavedBackgrounds };
export { sbgdb };