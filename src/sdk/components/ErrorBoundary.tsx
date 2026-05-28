import { atom, useAtom } from "jotai";
import "./styles/ErrorBoundary.scss";
import { Component, Fragment, type ReactElement, type JSXElementConstructor } from "react";
export const errorAtom=atom<boolean>(false);
interface ErrorBoundaryProps{
  children?:ReactElement<any,string|JSXElementConstructor<any>>|ReactElement[];
  customThrownError?:boolean;
}
interface ErrorBoundaryState{
  hasError:boolean;
  errorData:any;
}
export class ErrorBoundaryBase extends Component<ErrorBoundaryProps,ErrorBoundaryState>{
  constructor(props:ErrorBoundaryProps){
    super(props);
    this.state={hasError:false,errorData:null};
  }
  static getDerivedStateFromError(errorData: Object){return{hasError:true,errorData};}
  componentDidCatch(error:any,info:any){console.error(error,info);}
  render() {
    if (this.state.hasError||this.props.customThrownError)
      return (
        <>
          <div id="bsod">
            <pre>
              {[
                {c:"A problem has been detected and Beansite has been shut down to prevent damage to your computer."},
                {c:"If this is the first time you've seen this stop error screen, restart your bean. if this screen appears again, follow these steps:"},
                {c:"Check to make sure any new hardbeanware or softbeanware is properly installed. I this is a new installation, ask your hardbeanware or softbeanware manufacturer for and Beansite updates you might need."},
                {c:"If problems continue, disable or remove any newly installed hardbeanware or softbeanware. Disable BEAN memory options such as caching or shadowing. If you need to use Safe Mode to remove or disable components, restart your bean, press F8 to select Advanced Bean Options, and then select Safe Mode."},
                {c:"Technical information:"},
                {c:`*** STOP: ${this.state.errorData?.message ?? ""}`},
              ]
                .concat(String(this.state.errorData?.stack ?? "").replaceAll('"', "").split("\\n").map(data => ({ c: data, nobr: true, fLen: true })))
                .map((data, index) => (
                  <Fragment key={index}>
                    <p className={`${(data as any).ccn?(data as any).ccn:""} ${(data as any).fLen?"fLen":""}`}>{(data as any).c}</p>
                    {(data as any).nobr?null:<br/>}
                  </Fragment>
                ))}
            </pre>
          </div>
        </>
      );
    return this.props.children as ReactElement;
  }
}

export const ErrorBoundary=({children}:{children:ReactElement|ReactElement[]}):ReactElement=>{
  const[error]=useAtom(errorAtom);
  return <ErrorBoundaryBase customThrownError={error}>{children as any}</ErrorBoundaryBase>;
};
//?BSOD TEXT
// A problem has been detected and Windows has been shut down to prevent damage to your computer.
// If this is the first time you've seen this stop error screen, restart your computer. if this screen appears again, follow these steps:
// Check to make sure any new hardware or software is properly installed. I this is a new installation, ask your hardware or software manufacturer for and Windows updates you might need.
// If problems continue, disable or remove any newly installed hardware or software. Disable BIOS memory options such as caching or shadowing. If you need to use Safe Mode to remove or disable components, restart your computer, press F8 to select Advanced Startup Options, and then select Safe Mode.
// Technical information:
// *** STOP: 0x000000FE (0x00000008, 0x000000006, 0x00000009, 0x847075cc)