import { Dexie, type EntityTable } from "dexie";
interface IsavedBackgrounds {
  id:string;
  name:string;
  src:string|Blob;
}
const sbgdb=new Dexie("MB81SavedWallpapersDB")as Dexie &{saved:EntityTable<IsavedBackgrounds,"id">};
sbgdb.version(1).stores({saved:"++id,name,src",});
export const defaultBackgrounds:IsavedBackgrounds[]=[
  {
    id:"default1",
    name:"Leaves",
    src:"/wallpaper/1.jpg",
  },{
    id:"aurora",
    name:"Aurora",
    src:"/wallpaper/aurora.png",
  },{
    id:"beach",
    name:"Beach",
    src:"/wallpaper/beach.png",
  },{
    id:"old7",
    name:"Old 7",
    src:"/wallpaper/default.png",
  },{
    id:"dessert",
    name:"Dessert",
    src:"/wallpaper/dessert.png",
  },{
    id:"dots",
    name:"Dots",
    src:"/wallpaper/dots.png",
  },{
    id:"glass",
    name:"Glass",
    src:"/wallpaper/glass.png",
  },{
    id:"grid",
    name:"Grid",
    src:"/wallpaper/grid.png",
  },{
    id:"seeds",
    name:"Seeds",
    src:"/wallpaper/seeds.png",
  },{
    id:"technology",
    name:"Technology",
    src:"/wallpaper/technology.png",
  },{
    id:"waterfall",
    name:"Waterfall",
    src:"/wallpaper/waterfall.png",
  },{
    id:"windows",
    name:"Windows",
    src:"/wallpaper/windows.png",
  },
];
export type { IsavedBackgrounds };
export { sbgdb };