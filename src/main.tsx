import { StrictMode, type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from "react-router";
import { router } from './router.tsx';

const Wrapper=({}):ReactElement=>{
  return(<StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>);
};
createRoot(document.getElementById('root')!).render(<Wrapper/>,);