import { lazy, StrictMode, Suspense, type ReactElement } from 'react';
import { BrowserRouter, createBrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useNavigation } from 'react-router';
import { Loading } from './sdk/components/LoadingScreen.tsx';
import { AnimatePresence, motion } from 'motion/react';
import games from './sdk/components/store/games.ts';
import { generateId } from './sdk/Lib.tsx';
import { atom } from 'jotai';
import "./routes/Homepage/styles/loading.scss";
const BeanpoweredDemo=lazy(()=>import('./routes/Homepage/components/BeanpoweredDemo.tsx'));
const Beanpowered=lazy(()=>import('./apps/beanpowered/Beanpowered.tsx'));
const App=lazy(()=>{
  return Promise.all([
    import("./App.tsx"),
    new Promise(resolve=>setTimeout(resolve,200))
  ]).then(([moduleExports])=>moduleExports);
});
const ExtWindowRenderer=lazy(()=>import('./routes/ExtWindowRenderer/ExtWindowRenderer.tsx'));
const Homepage=lazy(()=>{
  return Promise.all([
    import("./routes/Homepage/Homepage.tsx"),
    new Promise(resolve=>setTimeout(resolve,200))
  ]).then(([moduleExports])=>moduleExports);
});
const RufflePage=lazy(()=>import('./routes/Ruf/Ruf.tsx'));
const DosboxPage=lazy(()=>import('./routes/Dos/Dos.tsx'));
const IFrameRenderer=lazy(()=>import('./routes/HTMLRenderer/IFrameRenderer.tsx'));
export const globalKey=generateId(20);
export const GlobalKeyAccessAtom=atom<string>(globalKey);
export const HomepageLoading=({}):ReactElement=>{
  return(<>
    <motion.div className='Loading'>
      <motion.span>Loading</motion.span>
    </motion.div>
  </>);
}
const RootLayout=()=>{
  // const loc=useLocation();
  // const nav=useNavigation();
  return(<AnimatePresence>
    <Suspense fallback={window.location.pathname=="/"
      ?<HomepageLoading/>
      :<Loading/>}>
      {/* {Boolean(nav.location)?():null} */}
      <Outlet/>
    </Suspense>
  </AnimatePresence>);
};
export const DeclarativeRouter=({})=>{
  // const [GlobalAccessKey]=atom(GlobalKeyAccessAtom);
  return(<><BrowserRouter>
    <AnimatePresence>
      {/* <Suspense fallback={window.location.pathname=="/"
        ?<HomepageLoading/>
        :<Loading/>}> */}
          {/* {isNavigating&&<Loading/>} */}
          <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/app" element={<App/>} />
            <Route path="/lstest" element={<Loading/>} />
            <Route path="/extwr" element={<ExtWindowRenderer/>} />
            {/* <Route path={GlobalAccessKey}> */}
              {/* <Route index element={GlobalAccessKey}/> */}
            {/* </Route> */}
            <Route path="g"> 
              <Route path="cel">
                <Route index element={<IFrameRenderer path="/g/src/cel/index.html"/>} />
                <Route path="src" element={<Navigate to="/g/cel/index.html" replace />}/>
              </Route>
              <Route path="dos">
                {/* <Route path="test" element={<DosboxPage path="/g/dos_src/OregonTrailDeluxe.zip"/>} /> */}
              </Route>
              <Route path="ruf">
                {games.ruf.map((x,i)=>
                  <Route key={i} path={x.id} element={
                    <RufflePage 
                      name={x.name} 
                      id={x.id} 
                      path={`/g/ruf_src/${x.src}.swf`}/>} />)}                  
                <Route path="test" element={<RufflePage name="Test" id="test" path="/g/ruf_src/ducklife.swf"/>} />
              </Route>
            </Route>
          </Routes>
      {/* </Suspense> */}
    </AnimatePresence>
  </BrowserRouter></>);
}
export const router=createBrowserRouter([{
  element:<RootLayout/>,
  children:[
    {path:"/",element:<Homepage/>},
    {path:"/app",element:<App/>},
    {path:"/bpdemo",element:<BeanpoweredDemo/>},
    {path:"/bp",element:<Beanpowered/>},
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
            { path: "test", element: <DosboxPage path="/g/dos_src/OregoneTrailDeluxe.jsdos"/> }
          ]
        },{
          path:"ruf",
          children:[ 
            ...games.ruf.map((x)=>{return{
              path:x.id,
              element:<RufflePage name={x.name} id={x.id} path={x.gameSrc as string}/>
            };}),
            {path:"test",element:<RufflePage name="Test" id="test" path="/g/ruf_src/ducklife.swf"/>}
          ],
        },
      ],
    },
  ],
},]);
