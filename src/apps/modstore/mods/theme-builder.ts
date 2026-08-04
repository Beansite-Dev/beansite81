import type { IModstore, Ioptions } from "../modstore";
export const themeBuilder:IModstore={
  id:"theme-builder",
  author:"m1dnightgmrofficial@gmail.com",
  authorNick:"M1dnight",
  name:"Theme Builder",
  description:"Build custom css themes from a color",
  source:"https://github.com/Beansite-Dev/beansite81/tree/main/src/apps/modstore/mods/theme-builder.ts",
  permissions:{useCustomCSS:true,useCustomScripts:true,},
  enabled:false,
  debug:false,
  tags:["Appearance","Styling"],
  customWindowSrc:`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Theme Builder</title>

      <style>
        @import url('https://fonts.cdnfonts.com/css/segoe-pro');
        @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200..900&display=swap');

        body {
          color:#000;
          margin:2rem;
        }
        body *{
          font-weight: 400;
          font-family:'Segoe Pro','Segoe UI',sans-serif;
        }

        #Settings {
          max-width:30rem;
        }

        #Settings button {
          margin:.5rem 0;
          width:10rem;
          color:#000;
          padding:.25rem 1.75rem;
          font-size:.75rem;
          border:1px solid #45454560;
          background:#fff;
          transition:.35s;
          cursor:pointer;
          outline:transparent 1px solid;
          outline-offset:-2px;
        }

        #Settings button:hover {
          color:#4192ea;
          border-color:#4192ea;
        }

        #Settings button:active {
          outline-color:#fff;
          background:#4192ea;
          border-color:transparent;
          color:#fff;
        }

        .settingsRow {
          display:flex;
          align-items:center;
          justify-content:space-between;
          position:relative;
          max-width:30rem;
        }

        .editorRow {
          display:block;
        }

        #Settings p {
          max-width:30rem;
        }

        input[type=color] {
          width:10rem;
          height:1.75rem;
          padding:0;
          border:1px solid #45454560;
          background:#fff;
          cursor:pointer;
        }

        .textEditor {
          display:block;
          width:30rem;
          height:30rem;
          max-width:30rem;
          max-height:30rem;
          outline:none;
          border:1px solid #45454550;
          background-color:#fcfcfc;
          overflow:hidden auto;
          white-space:pre-wrap;
          word-break:break-all;
          padding:.25rem;
          font-family:'Source Code Pro',monospace;
          font-size:.875rem;
          box-sizing:border-box;
          resize:both;
        }

        .textEditor:focus {
          border-color:#4192ea;
        }
      </style>
    </head>

    <body>
      <div id="Settings">
        <h1>Theme Builder</h1>

        <div class="settingsRow">
          <p>Primary Color</p>
          <input id="primary" type="color" value="#4287f5">
        </div>

        <button id="save">Save CSS</button>

        <div class="settingsRow editorRow">
          <textarea id="results" class="textEditor"></textarea>
        </div>
      </div>

      <style id="theme"></style>

      <script>
        const picker=document.getElementById("primary");
        const results=document.getElementById("results");
        const theme=document.getElementById("theme");
        const save=document.getElementById("save");

        function rgba(hex,alpha){
          const r=parseInt(hex.slice(1,3),16);
          const g=parseInt(hex.slice(3,5),16);
          const b=parseInt(hex.slice(5,7),16);

          return \`rgba(\${r},\${g},\${b},\${alpha})\`;
        }

        function getTextColor(hex){
          const r=parseInt(hex.slice(1,3),16);
          const g=parseInt(hex.slice(3,5),16);
          const b=parseInt(hex.slice(5,7),16);

          return ((r*299+g*587+b*114)/1000)>140
            ? "#000"
            : "#fff";
        }

        function buildTheme(){
          const primary=picker.value;
          const border="#959595";
          const font=getTextColor(primary);

          const css=\`
.custom .Window {
  background:\${rgba(primary,.44)};
  backdrop-filter:blur(10px);
  border:1px \${rgba(border,.58)} solid;
}
.custom .Window .WinContents {
  background:white;
  border:1px \${rgba(border,.58)} solid;
}
.custom .Window .Title {
  color:\${font};
}
.custom .Window .Button {
  background:transparent;
  color:\${font};
}
.custom .Window .Button.x {
  background:#c75050 !important;
  width:40px !important;
  color:#fff !important;
}
.custom .Window .Button:hover {
  background:#0d73d1;
  color:#fff;
}
.custom .Window .Button:hover.x {
  background:#c52020 !important;
}
.custom #Taskbar {
  background:\${rgba(primary,.44)};
  backdrop-filter:blur(10px);
  border:1px \${rgba(border,.58)} solid;
}
.custom #Taskbar .item .preview {
  background:\${rgba(primary,.84)} !important;
  border:1px \${rgba(border,.58)} solid !important;
}
.custom #StartMenu {
  background-color:#240763;
}
.custom .Dialog {
  background:\${rgba(primary,.84)} !important;
  border:1px \${rgba(border,.58)} solid !important;
}
.custom .Dialog .ContentWrapper {
  background:\${primary};
  border:1px \${rgba(border,.58)} solid;
}
    \`;

          results.value=css;
          theme.textContent=css;
        }

        save.onclick=()=>{
          const blob=new Blob(
            [results.value],
            {type:"text/css"}
          );

          const url=URL.createObjectURL(blob);
          const a=document.createElement("a");

          a.href=url;
          a.download="theme.css";
          a.click();

          URL.revokeObjectURL(url);
        };

        picker.addEventListener("input",buildTheme);
        buildTheme();
      </script>
    </body>
    </html>
  `
};