import { StrictMode, Suspense, type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider, useLocation } from "react-router";
import { router, DeclarativeRouter, HomepageLoading } from './router.tsx';
import { Loading } from './sdk/components/LoadingScreen.tsx';

const Wrapper=({}):ReactElement=>{
  return(<StrictMode>
    <HelmetProvider>
      <DeclarativeRouter/>
      {/* <Suspense fallback={window.location.pathname=="/"
        // ?<HomepageLoading/>
        // :<Loading/>}> */}
      {/* <RouterProvider router={router} /> */}
      {/* </Suspense> */}
    </HelmetProvider>
  </StrictMode>);
};
createRoot(document.getElementById('root')!).render(<Wrapper/>,);