import type { IModstore, Ioptions } from "../modstore";
type HexColor=`#${string}`;
const variables:{
  var:Colors,
  value:HexColor,
}[]=[
  {var:"Black",value:"#0C0C0C",},
  {var:"BrightBlack",value:"#252525",},
  {var:"Gray",value:"#767676",},
  {var:"DarkGray",value:"#454545",},
  {var:"BrightGray",value:"#999",},
  {var:"White",value:"#CCCCCC",},
  {var:"BrightWhite",value:"#F2F2F2",},
  {var:"Blue",value:"#0037DA",},
  {var:"DarkBlue",value:"#012456",},
  {var:"BrightBlue",value:"#3B78FF",},
  {var:"Green",value:"#13A10E",},
  {var:"DarkGreen",value:"#0b5308",},
  {var:"BrightGreen",value:"#16C60C",},
  {var:"Cyan",value:"#3A96DD",},
  {var:"DarkCyan",value:"#235981",},
  {var:"BrightCyan",value:"#61D6D6",},
  {var:"Red",value:"#FF0015",},
  {var:"DarkRed",value:"#860a14",},
  {var:"BrightRed",value:"#E74856",},
  {var:"Orange",value:"#ff7b00",},
  {var:"DarkOrange",value:"#86370a",},
  {var:"BrightOrange",value:"#e77548",},
  {var:"Magenta",value:"#881798",},
  {var:"DarkMagenta",value:"#530D5C",},
  {var:"BrightMagenta",value:"#B4009E",},
  {var:"Yellow",value:"#FFCC00",},
  {var:"DarkYellow",value:"#C19C00",},
  {var:"BrightYellow",value:"#F9F1A5",},
];
export const beanshellCustomThemer:IModstore={
  id:"bsh-custom-themer",
  author:"m1dnightgmrofficial@gmail.com",
  authorNick:"M1dnight",
  name:"Beanshell Themer",
  description:"Allows custom theming for beanshell",
  source:"https://github.com/Beansite-Dev/beansite81/tree/main/src/apps/modstore/mods/beanshell-custom-themer.ts",
  permissions:{useCustomCSS:true,useCustomScripts:true,},
  enabled:false,
  debug:false,
  tags:["Beanshell","Appearance","Styling"],
  customCSS:`
    #bsWrapper {
      background: var(--bsh-ct-bg) !important;
    }
    ${variables.map((item)=>`#bsWrapper .clr${item.var} {
      color:${item.value} !important;
    }`).join("\n")}
    ${variables.map((item)=>`#bsWrapper .bg${item.var} {
      background-color:${item.value} !important;
    }`).join("\n")}
  `,
  scripts:{
    preload:`
      document.documentElement.style.setProperty('--bsh-ct-bg',"#012456");
      ${variables.map((item)=>
        `document.documentElement.style.setProperty('--bsh-ct-${item.var}','${item.value}');`)
        .join("\n")}
    `,
  },
  options:[
    {
      name:`Background`,
      description:"background color",
      type:"color",
      value:"#012456",
      onchange:`document.documentElement.style.setProperty('--bsh-ct-bg',newval);`
    },
    ...variables.map((item)=>{return{
      name:`${item.var}`,
      description:"Text/Background color",
      type:"color",
      value:item.value,
      onchange:`document.documentElement.style.setProperty('--bsh-ct-${item.var}',newval);`
    }})as Ioptions[],
  ],
};