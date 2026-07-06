type OptType="text"|"number"|"boolean"|"select"|"color";
interface TestVar{
  name:string;
  value:string|number|boolean;
  type:OptType;
}
const testVars:TestVar[]=[
  {name:"Alpha",value:"first",type:"text"},
  {name:"Beta",value:2,type:"number"},
  {name:"Gamma",value:true,type:"boolean"},
];
const buildOption=(v:TestVar)=>({
  name:`Test ${v.name}`,
  description:`auto-generated param for ${v.name}`,
  type:v.type,
  value:v.value,
  onchange:`console.log("[test-mod-3] on change ran for ${v.name}",newval)`
});
//@ts-expect-error
module.exports=(()=>{
  return{
    id:"test-mod-3",
    author:"m1dnightgmrofficial@gmail.com",
    authorNick:"M1dnight",
    name:"Test Mod 3",
    description:"TypeScript test mod demonstrating runtime type stripping",
    source:"https://github.com/Beansite-Dev/beansite81",
    permissions:{useCustomCSS:true,useCustomScripts:true},
    enabled:false,
    debug:true,
    tags:["Test","TypeScript","Tag3"],
    scripts:{
      preload:`
        console.log("[test-mod-3] Hi from preload!");
        ${testVars.map(v=>`console.log("[test-mod-3] preload var ${v.name} =",${JSON.stringify(v.value)});`).join("\n")}
      `,
      main:`console.log("[test-mod-3] Hi from main!")`,
      onchange:`console.log("[test-mod-3] super on change",newmod)`
    },
    customCSS:`
      body { color: dodgerblue; }
      ${testVars.map(v=>`.test-${v.name.toLowerCase()} { outline: 1px dashed dodgerblue; }`).join("\n")}
    `,
    options:[
      {
        name:"Test Select",
        description:"cool",
        type:"select",
        value:"option 1",
        selectOptions:["option 1","option 2","option 3"],
        onchange:`console.log("[test-mod-3] on change ran for test select",newval)`
      },
      ...testVars.map(buildOption)
    ]
  };
})();