import { StrictMode, type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import { DeclarativeRouter } from './router.tsx';
import "./index.scss";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/react';
const Wrapper=({}):ReactElement=><StrictMode><HelmetProvider>
  <Analytics/>
  <SpeedInsights/>
  <DeclarativeRouter/>
</HelmetProvider></StrictMode>;
createRoot(document.getElementById('root')!).render(<Wrapper/>,);