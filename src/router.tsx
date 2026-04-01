import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router';
import { Loading } from './sdk/components/LoadingScreen.tsx';
import { AnimatePresence } from 'motion/react';
import games from './sdk/components/store/games.ts';
import { generateId } from './sdk/Lib.tsx';
import { atom } from 'jotai';
const App=lazy(()=>{
  return Promise.all([
    import("./App.tsx"),
    new Promise(resolve=>setTimeout(resolve,300))
  ]).then(([moduleExports])=>moduleExports);
});
const ExtWindowRenderer=lazy(()=>import('./routes/ExtWindowRenderer/ExtWindowRenderer.tsx'));
const Homepage=lazy(()=>import('./routes/Homepage/Homepage.tsx'));
const RufflePage=lazy(()=>import('./routes/Ruf/Ruf.tsx'));
const IFrameRenderer=lazy(()=>import('./routes/HTMLRenderer/IFrameRenderer.tsx'));
export const globalKey=generateId(20);
export const GlobalKeyAccessAtom=atom<string>(globalKey);
const RootLayout=()=>{
  return(<AnimatePresence>
    <Suspense fallback={<Loading/>}>
      <Outlet/>
    </Suspense>
  </AnimatePresence>);
};
export const router=createBrowserRouter([
  {
    element:<RootLayout/>,
    children:[
      {path:"/",element:<Homepage/>},
      {path:"/app",element:<App/>},
      {path:"/lstest",element:<Loading/>},
      {path:"/extwr",element:<ExtWindowRenderer/>},
      {path:globalKey,element:<>{globalKey}</>},
      {
        path:"g",
        children:[
          {
            path:"cel",
            children:[
              {index:true,element:<IFrameRenderer path="/g/src/cel/index.html"/>},
              {path:"src",element:<Navigate to="/g/cel/index.html" replace/>}
            ]
          },{
            path:"dos",
            children:[
              // { path: "test", element: <DosboxPage path="/g/dos_src/OregonTrailDeluxe.zip"/> }
            ]
          },{
            path:"ruf",
            children:[  
              ...games.ruf.map((x)=>{
                return{
                  path:x.id,
                  element:<RufflePage name={x.name} id={x.id} path={`/g/ruf_src/${x.src}.swf`}/>
                };
              }),
              {path:"test",element:<RufflePage name="Test" id="test" path="/g/ruf_src/ducklife.swf"/>}
            ]
          }
        ]
      }
    ]
  }
]);
