import { atom } from "jotai";
// import { Window } from "./sdk";
export interface IWinObj{
  uuid:string;
  id:string;
  title:string;
  // component:typeof Window;
};
export const WinAtom=atom<IWinObj[]>([]);