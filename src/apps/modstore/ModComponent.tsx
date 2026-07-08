// import React,{useMemo} from 'react';
// //@ts-expect-error
// import * as Babel from '@babel/standalone';
// const componentString=`
//   ({ name }) => {
//     const [count, setCount] = React.useState(0);
//     return (
//       <div style={{ padding: '10px', border: '1px solid black' }}>
//         <h3>Hello {name}!</h3>
//         <button onClick={() => setCount(count + 1)}>Clicks: {count}</button>
//       </div>
//     );
//   }
// `;
// export function DynamicComponentRenderer({name}:any){
//   const DynamicComponent=useMemo(()=>{
//     const compiledCode=Babel.transform(componentString,{presets:['react']}).code;
//     return new Function('React',`return ${compiledCode}`)(React);
//   },[]);
//   return<DynamicComponent name={name}/>;
// }