module.exports=(()=>{
  const testVars=[
    {name:"Alpha",value:"first",type:"text"},
    {name:"Beta",value:"2",type:"number"},
    {name:"Gamma",value:"true",type:"boolean"},
  ];
  return{
    id:"test-mod-2-js",
    author:"m1dnightgmrofficial@gmail.com",
    authorNick:"M1dnight",
    name:"Test Mod 2 JS",
    description:"Just a simple test mod x2",
    source:"https://github.com/Beansite-Dev/beansite81/tree/main/src/apps/modstore/mods/tests/testMod.js",
    permissions:{useCustomCSS:true,useCustomScripts:true},
    enabled:false,
    debug:true,
    tags:["Test","Tag1","Tag2"],
    scripts:{
      preload:`
        console.log("[test-mod-2-js] Hi from preload!");
        ${testVars.map(v=>`console.log("[test-mod-2-js] preload var ${v.name} =",${JSON.stringify(v.value)});`).join("\n")}
      `,
      main:`console.log("[test-mod-2-js] Hi from main!")`,
      onchange:`console.log("[test-mod-2-js] super on change",newmod)`
    },
    customCSS:`
      body { color: red; }
      ${testVars.map(v=>`.test-${v.name.toLowerCase()} { outline: 1px dashed lime; }`).join("\n")}
    `,
    options:[
      {
        name:"Test Parameter",
        description:"just a test lol",
        type:"text",
        value:"",
        onchange:`console.log("[test-mod-2-js] on change ran for test param",newval)`
      },
      {
        name:"Test Select",
        description:"cool",
        type:"select",
        value:"option 1",
        selectOptions:["option 1","option 2","option 3"],
        onchange:`console.log("[test-mod-2-js] on change ran for test param 4",newmod)`
      },
      ...testVars.map(v=>({
        name:`Test ${v.name}`,
        description:`auto-generated param for ${v.name}`,
        type:v.type,
        value:v.type==="number"?Number(v.value):v.type==="boolean"?v.value==="true":v.value,
        onchange:`console.log("[test-mod-2-js] on change ran for ${v.name}",newval)`
      }))
    ]
  };
})();