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
  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1]) as keyof typeof params] = decodeURIComponent(tokens[2]) as typeof params[keyof typeof params];
  }
  console.log(params);
  return params;
}
export const queryParams=getQueryParams(window.location.search);