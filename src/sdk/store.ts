import { atom } from "jotai";
import type { Icons } from "./components/Enum";
// import { Window } from "./sdk";
export interface IWinObj{
  uuid:string;
  id:string;
  title:string;
  icon:keyof typeof Icons;
  // component:typeof Window;
};
export const WinAtom=atom<IWinObj[]>([]);