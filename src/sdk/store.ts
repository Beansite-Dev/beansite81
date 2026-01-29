import { atom } from "jotai";
import type { Icons } from "./components/Enum";
// import { Window } from "./sdk";
export interface IWinObj{
  uuid:string;
  id:string;
  title:string;
  icon:keyof typeof Icons;
  open:boolean;
  minimized:boolean;
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
// const setWindowUnique=(newItem:IWinObj)=>{
  // setWindow((x)=>{return uniqueById([...x,newItem]);});
// };