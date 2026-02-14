import "./styles/ErrorBoundary.scss";
import { Component, Fragment } from "react";
export class ErrorBoundary extends Component {
  constructor(props:any){
    super(props);
    interface Istate {
      hasError:boolean;
      errorData:any;
    }
    this.state={hasError:false,errorData:null};
  }
  static getDerivedStateFromError(errorData:Object){return({hasError:true,errorData});}
  componentDidCatch(error:any,info:any){
    console.error(error,info);
    alert(`${error} ${JSON.stringify(info)}`)
  }
  render(){
    // @ts-ignore
    if(this.state.hasError)return(<>
      <div id="bsod">
        <pre>
          {[
            {"c":"A problem has been detected and Beansite has been shut down to prevent damage to your computer."},
            {"c":"If this is the first time you've seen this stop error screen, restart your bean. if this screen appears again, follow these steps:"},
            {"c":"Check to make sure any new hardbeanware or softbeanware is properly installed. I this is a new installation, ask your hardbeanware or softbeanware manufacturer for and Beansite updates you might need."},
            {"c":"If problems continue, disable or remove any newly installed hardbeanware or softbeanware. Disable BEAN memory options such as caching or shadowing. If you need to use Safe Mode to remove or disable components, restart your bean, press F8 to select Advanced Bean Options, and then select Safe Mode."},
            {"c":"Technical information:"},
            // {"c":"*** STOP: 0x000000FE (0x00000008, 0x000000006, 0x00000009, 0x847075cc)"}
            // @ts-ignore
            {"c":`*** STOP: ${this.state.errorData.message}`},
          // @ts-ignore
          ].concat(JSON.stringify(this.state.errorData.stack).replaceAll('"',"").split("\\n").map(data=>({"c":data,"nobr":true,"fLen":true})))
          .map((data,index)=>
            <Fragment key={index}>
              {/* @ts-ignore */}
              <p className={`${data.ccn?data.ccn:""} ${data.fLen?"fLen":""}`}>{data.c}</p>
            {/* @ts-ignore */}
            {data.nobr?null:<br/>}</Fragment>)}
          
        </pre>
      </div>
    </>);
    // @ts-ignore
    return this.props.children;
  }
}
//?BSOD TEXT
// A problem has been detected and Windows has been shut down to prevent damage to your computer.
// If this is the first time you've seen this stop error screen, restart your computer. if this screen appears again, follow these steps:
// Check to make sure any new hardware or software is properly installed. I this is a new installation, ask your hardware or software manufacturer for and Windows updates you might need.
// If problems continue, disable or remove any newly installed hardware or software. Disable BIOS memory options such as caching or shadowing. If you need to use Safe Mode to remove or disable components, restart your computer, press F8 to select Advanced Startup Options, and then select Safe Mode.
// Technical information:
// *** STOP: 0x000000FE (0x00000008, 0x000000006, 0x00000009, 0x847075cc)