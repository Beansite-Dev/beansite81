import { useState } from "react";
export const generateId=(length:number)=>{
  let result='';
  const characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter=0;
  while(counter<length){
    result+=characters.charAt(Math.floor(Math.random() * charactersLength));
    counter+=1;
  }
  return btoa(result).replaceAll("=","");
}
export const getQueryParams=(qs:string)=>{
  qs=qs.split('+').join(' ');
  var params={},
    tokens,
    re=/[?&]?([^=]+)=([^&]*)/g;
  while(tokens=re.exec(qs)){
    params[decodeURIComponent(tokens[1]) as keyof typeof params] = decodeURIComponent(tokens[2]) as typeof params[keyof typeof params];
  }
  console.log(params);
  return params;
}
interface IqueryParams {
  lb?:boolean|string;
  [key:string]:any;
}
export const shuffle=(array:any[]):void=>{
  let currentIndex=array.length;
  while(currentIndex!=0){
    let randomIndex=Math.floor(Math.random()*currentIndex);
    currentIndex--;
    [array[currentIndex],array[randomIndex]]=[array[randomIndex],array[currentIndex]];
  }
}
export function checkGoGuardianBlock(url:string){
  return new Promise((resolve)=>{
    const script=document.createElement('script');
    script.src=url;
    script.onload=()=>{
      resolve({blocked:false,reason:'Loaded successfully'});
      script.remove();
    };
    script.onerror=(error)=>{
      resolve({blocked:true,reason:'Network error or extension block'});
      script.remove();
    };
    document.head.appendChild(script);
  });
}
export const queryParams:IqueryParams=getQueryParams(window.location.search);
