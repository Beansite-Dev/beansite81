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
export function getQueryParams(qs) {
    qs = qs.split('+').join(' ');
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1]) as keyof typeof params] = decodeURIComponent(tokens[2]);
    }
    return params;
}
export const queryParams=getQueryParams(window.location.search);
// Object.filter = (obj:Object, predicate:Function) => 
//   Object.keys(obj)
//     .filter( key => predicate(obj[key]) )
//     .reduce( (res, key) => (res[key] = obj[key], res),{});
// export const useSwipe = (onSwipeLeft, onSwipeRight) => {
//   const [touchStart, setTouchStart] = useState(null);
//   const [touchEnd, setTouchEnd] = useState(null);
//   // Minimum distance to be considered a swipe
//   const minSwipeDistance = 50;
//   const onTouchStart = (e) => {
//     setTouchEnd(null); // Reset touch end
//     setTouchStart(e.targetTouches[0].clientX);
//   };
//   const onTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };
//   const onTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;
//     const distance = touchStart - touchEnd;
//     const isLeftSwipe = distance > minSwipeDistance;
//     const isRightSwipe = distance < -minSwipeDistance;

//     if (isLeftSwipe) {
//       onSwipeLeft && onSwipeLeft();
//     } else if (isRightSwipe) {
//       onSwipeRight && onSwipeRight();
//     }
//   };
//   return{
//     onTouchStart,
//     onTouchMove,
//     onTouchEnd
//   };
// };