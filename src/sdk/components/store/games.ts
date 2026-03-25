import { id } from "date-fns/locale";
import ruf from "./ruf.json";
console.table(ruf);
interface IGame {
  id:string
  name:string,
  src:string
}
interface IGames {
  ruf:IGame[],
  dos:IGame[],
  gen:IGame[],
}
const games:IGames={
  ruf:[
    ...Object.entries(ruf).map(([id,g])=>{return{
      id,name:g.name,src:g.src,
    }}),
  ],
  dos:[],
  gen:[
    {
      name:"Cookie Clicker",
      src:"/g/src/cc/index.html",
      id:"cc",
    },{
      name:"Celeste",
      src:"/g/src/celeste/index.html",
      id:"cel",
    },
  ],
};
export default games;