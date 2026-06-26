import { StrictMode, type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import { DeclarativeRouter } from './router.tsx';
import "./index.scss";
const Wrapper=({}):ReactElement=><StrictMode><HelmetProvider>
  <DeclarativeRouter/>
</HelmetProvider></StrictMode>;
createRoot(document.getElementById('root')!).render(<Wrapper/>,);