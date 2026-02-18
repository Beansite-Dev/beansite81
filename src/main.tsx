import { StrictMode, type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from "react-router";
import { ExtWindowRenderer } from './routes/ExtWindowRenderer/ExtWindowRenderer.tsx';
const Wrapper=({}):ReactElement=>{
  return(<StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>} />
          <Route path="/extwr" element={<ExtWindowRenderer/>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>);
}
createRoot(document.getElementById('root')!).render(<Wrapper/>,);