import { lazy, StrictMode, Suspense, type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from "react-router";
// import { ExtWindowRenderer } from './routes/ExtWindowRenderer/ExtWindowRenderer.tsx';
import { Loading } from './sdk/components/LoadingScreen.tsx';
import { AnimatePresence } from 'motion/react';
import games from './sdk/components/store/games.ts';
import { generateId } from './sdk/Lib.tsx';
import { atom, useAtom } from 'jotai';
// const App=lazy(()=>import('./App.tsx'));
const App=lazy(()=>{
  return Promise.all([
    import("./App.tsx"),
    new Promise(resolve=>setTimeout(resolve,300))
  ]).then(([moduleExports]) => moduleExports);
});
const ExtWindowRenderer=lazy(()=>import('./routes/ExtWindowRenderer/ExtWindowRenderer.tsx'));
const Homepage=lazy(()=>import('./routes/Homepage/Homepage.tsx'));
// const DosboxPage=lazy(()=>import('./routes/Dos/Dos.tsx'));
const RufflePage=lazy(()=>import('./routes/Ruf/Ruf.tsx'));
const GlobalKeyAccessAtom=atom<string>(generateId(20));
const Wrapper=({}):ReactElement=>{
  const[GlobalKeyAccess]=useAtom(GlobalKeyAccessAtom);
  return(<StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AnimatePresence>
          <Suspense fallback={<Loading/>}>
            <Routes>
              <Route path="/" element={<Homepage/>} />
              <Route path="/app" element={<App/>} />
              <Route path="/lstest" element={<Loading/>} />
              <Route path="/extwr" element={<ExtWindowRenderer/>} />
              <Route path={GlobalKeyAccess}>
                <Route index element={GlobalKeyAccess}/>
              </Route>
              <Route path="g"> 
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
          </Suspense>
        </AnimatePresence>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>);
}
createRoot(document.getElementById('root')!).render(<Wrapper/>,);