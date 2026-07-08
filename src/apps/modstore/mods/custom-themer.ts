import type { IModstore } from "../modstore";
export const customThemer:IModstore={
  id:"custom-themer",
  author:"m1dnightgmrofficial@gmail.com",
  authorNick:"M1dnight",
  source:"https://github.com/Beansite-Dev/beansite81/tree/main/src/apps/modstore/mods/custom-themer.ts",
  name:"Custom Themer",
  description:"Apply custom themes from css urls. You can upload/fetch some from out official [github](https://github.com/Beansite-Dev/beansite81-themes). Advanced users may use data urls of type `text/css`",
  enabled:false,
  tags:["Appearance","Styling","Custom CSS"],
  permissions:{useCustomCSS:true,useCustomScripts:true,},
  scripts:{preload:`
    window.customThemerLinkElm=document.createElement("link");
    document.head.appendChild(window.customThemerLinkElm);
    window.customThemerLinkElm.setAttribute("rel","stylesheet");
  `,},
  options:[
    {
      name:"Theme URL",
      description:"if link is valid, theme will apply",
      type:"text",
      onchange:`
        async function verifyUrlHeader(url){try{
          const response=await fetch(url,{method:'HEAD'});// HEAD request saves bandwidth
          if(!response.ok)return{valid:false,error:\`HTTP Error: \${response.status}\`};
          const contentType=response.headers.get('content-type')||'';
          if(contentType.includes('text/plain'))return{valid:true,type:'css'};
          return{valid:false,error:\`Invalid content type: \${contentType}\`};
        }catch(error){
          return{valid:false,error:'URL unreachable or blocked by CORS'};
        }}
        (async()=>{
          if(newval){
            if(!URL.canParse(newval)){
              alert("error:\\n"+JSON.stringify({valid:false,error:'Invalid URL'},null,2));
              return;
            }
            const urlCheck=await verifyUrlHeader(newval);
            if(urlCheck.valid&&!!window.customThemerLinkElm){
              let x=document.getElementById("Beansite81").className.split(" ");
              document.getElementById("Beansite81").className=\`\${x[0]} custom \${x[2]}\`;
              window.customThemerLinkElm.setAttribute("href",newval);
            }else{
              alert("error:\\n"+JSON.stringify(urlCheck,null,2));
              window.customThemerLinkElm.setAttribute("href","");
            }
          }else window.customThemerLinkElm.setAttribute("href","");
        })();
      `
    }
  ]
};
