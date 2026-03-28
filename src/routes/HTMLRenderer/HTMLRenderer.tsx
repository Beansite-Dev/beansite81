import { calcExactPositionOrRandomFromSizeRanged } from "@tsparticles/engine";
import { useEffect, useState, type ReactElement } from "react";
import { Helmet } from "react-helmet-async";
import parse, { domToReact } from "html-react-parser";
import React from "react";
interface IHTMLRenderer {
  path:string;
} 
const options={
  replace: (domNode: DOMNode) => {
    // We only want to process tags, which are 'Element' types in domhandler
    if (domNode instanceof Element && domNode.type === 'tag') {
      // --- SCRIPT TAG HANDLING ---
      if (domNode.name === 'script') {
        const ScriptComponent = () => {
          useEffect(() => {
            const { attribs, children } = domNode;

            // Handle external scripts with a 'src'
            if (attribs && attribs.src) {
              const script = document.createElement('script');
              script.src = attribs.src;
              script.async = true;
              document.body.appendChild(script);

              return () => {
                if (document.body.contains(script)) {
                  document.body.removeChild(script);
                }
              };
            } 
            // Handle inline scripts
            else if (children.length > 0 && children[0] instanceof Text) {
              try {
                // Execute the script content in the global scope
                new Function(children[0].data)();
              } catch (e) {
                console.error('Error executing inline script:', e);
              }
            }
          }, []); // Run only once when the component mounts

          return null; // This component doesn't render anything
        };
        return <ScriptComponent />;
      }

      // --- EVENT HANDLER ATTRIBUTE HANDLING ---
      const eventAttributes = domNode.attribs && Object.keys(domNode.attribs).filter(key => key.startsWith('on'));

      if (eventAttributes && eventAttributes.length > 0) {
        const props: Record<string, any> = {};
        
        // Convert all attributes to React-compatible props
        for (const key in domNode.attribs) {
          const value = domNode.attribs[key];
          
          if (key.startsWith('on')) {
            const eventMap: { [key: string]: string } = {
              'onclick': 'onClick', 'ondblclick': 'onDoubleClick',
              'onchange': 'onChange', 'oninput': 'onInput',
              'onsubmit': 'onSubmit', 'onfocus': 'onFocus',
              'onblur': 'onBlur', 'onkeydown': 'onKeyDown',
              'onkeyup': 'onKeyUp', 'onkeypress': 'onKeyPress',
              'onmousedown': 'onMouseDown', 'onmouseup': 'onMouseUp',
              'onmousemove': 'onMouseMove', 'onmouseover': 'onMouseOver',
              'onmouseout': 'onMouseOut', 'onmouseenter': 'onMouseEnter',
              'onmouseleave': 'onMouseLeave',
            };
            
            const reactEventName = eventMap[key.toLowerCase()];
            if (reactEventName) {
              // Create a function that executes the attribute's code in the global scope
              props[reactEventName] = () => {
                try {
                  new Function(value)();
                } catch (e) {
                  console.error(`Error executing '${key}' handler:`, e);
                }
              };
            } else {
              props[key] = value; // Pass through unmapped event handlers
            }
          } else if (key === 'class') {
            props.className = value;
          } else if (key === 'style') {
            // Convert style string to a style object for React
            const styleObject: Record<string, string> = {};
            value.split(';').forEach(style => {
              const [property, styleValue] = style.split(':');
              if (property && styleValue) {
                const camelProperty = property.trim().replace(/-(\w)/g, (match, letter) => letter.toUpperCase());
                styleObject[camelProperty] = styleValue.trim();
              }
            });
            props.style = styleObject;
          } else {
            props[key] = value;
          }
        }
        
        // Return a new React element with the created props, and recursively parse its children
        return React.createElement(domNode.name, props, domToReact(domNode.children, options));
      }
    }
  }
};
const HTMLRenderer=({path}:IHTMLRenderer):ReactElement=>{
  const[headData,setHeadData]=useState<string>("");
  const[data,setData]=useState<string>("");
  const[mounted,setMounted]=useState<boolean>(false);
  useEffect(()=>{
    const parser=new DOMParser();
    fetch(path).then(x=>x.text()).then(res=>{
      const domDocument=parser.parseFromString(res,"text/html");
      setHeadData(domDocument.head.innerHTML);
      setData(domDocument.body.innerHTML);
      setMounted(true);
    }).catch(e=>{console.error('Fetch error:',e.message);});
  },[]);
  useEffect(()=>{
    // console.log(document.documentElement.getHTML({serializableShadowRoots:true}));
    // console.warn(headData);
  },[data,headData])
  return(<>
    <Helmet>
      {headData===""?null:parse(headData,options)}
    </Helmet>
    {/* <div dangerouslySetInnerHTML={{__html:data}}></div> */}
    {data===""?null:parse(data,options)}
  </>);
};
export default HTMLRenderer;