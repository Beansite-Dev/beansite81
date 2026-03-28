import { useEffect, useState } from "react";

interface IIFrameRenderer {
  path:string;
}
const IFrameRenderer=({path}:IIFrameRenderer)=>{
  const[htmlContent,setHtmlContent]=useState<string>("");
  useEffect(()=>{
    if(!path)return;
    fetch(path)
      .then((res) => res.text())
      .then((text) => {
        setHtmlContent(text);
      });
  },[path]);
  if(!htmlContent){return <div>Loading...</div>;}
  return(<iframe
    srcDoc={htmlContent}
    style={{
      position:"fixed",
      top:"50%",left:"50%",
      translate:"-50% -50%",
      height:"100dvh",width:"100dvw",
      margin:"0",padding:"0",
      border:"none"
    }}
    className="html-renderer-iframe"
    title="Embedded Content"
    sandbox="allow-scripts allow-same-origin"
  />);
};
export default IFrameRenderer;