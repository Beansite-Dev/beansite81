import { atom } from "jotai";
import type { Icons } from "./components/Enum";
// import { Window } from "./sdk";
export interface IWinObj{
  uuid:string;
  id:string;
  title:string;
  icon:string;
  open:boolean;//|null;
  minimized:boolean;//|null;
  // component:typeof Window;
};
export const uniqueById=(items:IWinObj[])=>{
  const set=new Set();
  return items.filter((item)=>{
    const isDuplicate=set.has(item.id);
    set.add(item.id);
    return !isDuplicate;
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
    if(item.id===update[0]){
      return {...item, [update[1]]: update[2]};
    }
    return item;
  }))
);
export const ExpressDerivedWinModifierAtom=atom(
  // windows2[windows.findIndex((win)=>{return win===id;})]
  (get)=>get(WinAtom),
  (get,set,update:[string,keyof IWinObj,any][])=>{
    update.forEach(x=>{
      set(WinAtom,get(WinAtom).map((item:IWinObj)=>{
        if(item.id===x[0]){
          return {...item, [x[1]]: x[2]};
        }
        return item;
      }))
    })
  }
);
// export const SettingsAtom=atom(
//   localStorage.getItem("mb7-settings")&&(()=>{
//     const requiredKeys=[
//       "backgroundImage",
//       "backgroundSize",
//       "backgroundRepeat",
//       "savedWallpapers",
//       "theme",
//       "font",
//     ];
//     const settings=JSON.parse(localStorage.getItem("mb7-settings"));
//     return settings&&
//       Array.isArray(Object.keys(settings)) &&
//       requiredKeys.every(key => Object.keys(settings).includes(key));
//   })()?JSON.parse(localStorage.getItem("mb7-settings")):{
//     backgroundImage:"/wallpapers/default.png",
//     backgroundSize:"cover",
//     backgroundRepeat:"no-repeat",
//     savedWallpapers:[],
//     theme:"default",
//     font:"segoe",
// });
export interface ISettingsAtom {
  backgroundImage: string;
  backgroundSize: "cover"|"contain"|number|string;
  backgroundRepeat: "repeat"|"norepeat"|number|string;
  theme: "default"|"lib"|"dark";
  font: "segoe"|"tahoma"|"comic"|"time"|"mono",
};
export const SettingsAtom=atom<ISettingsAtom>(
  localStorage.getItem("mb81-settings")&&(()=>{
    const settings=JSON.parse(localStorage.getItem("mb81-settings")!);
    return settings&&
      Array.isArray(Object.keys(settings))&&[
        "backgroundImage",
        "backgroundSize",
        "backgroundRepeat",
        "theme",
        "font",
      ].every(key=>Object.keys(settings).includes(key));
  })()?JSON.parse(localStorage.getItem("mb81-settings")!):{
    backgroundImage:"/wallpapers/1.jpg",
    backgroundSize:"cover",
    backgroundRepeat:"no-repeat",
    theme:"default",
    font:"segoe",
});
export const DerivedSetttingsAtom=atom(
  (get)=>get(SettingsAtom),
  (get,set,update:[keyof ISettingsAtom,any])=>
    // @ts-expect-error
    set(SettingsAtom,{
      ...get(SettingsAtom),
      [update[0]]:update[1],
    } as ISettingsAtom),
);