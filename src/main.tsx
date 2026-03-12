import { lazy, StrictMode, Suspense, type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from "react-router";
// import { ExtWindowRenderer } from './routes/ExtWindowRenderer/ExtWindowRenderer.tsx';
import { Loading } from './sdk/components/LoadingScreen.tsx';
import { AnimatePresence } from 'motion/react';
// const App=lazy(()=>import('./App.tsx'));
const App=lazy(()=>{
  return Promise.all([
    import("./App.tsx"),
    new Promise(resolve=>setTimeout(resolve,300))
  ]).then(([moduleExports]) => moduleExports);
});

const ExtWindowRenderer=lazy(()=>import('./routes/ExtWindowRenderer/ExtWindowRenderer.tsx'));
const Wrapper=({}):ReactElement=>{
  return(<StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AnimatePresence>
          <Suspense fallback={<Loading/>}>
            <Routes>
              <Route path="/" element={<App/>} />
              <Route path="/lstest" element={<Loading/>} />
              <Route path="/extwr" element={<ExtWindowRenderer/>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>);
}
createRoot(document.getElementById('root')!).render(<Wrapper/>,);