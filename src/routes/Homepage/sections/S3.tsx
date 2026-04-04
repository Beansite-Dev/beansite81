import { motion } from "motion/react";
import type { Variants } from "motion/react";
import type { ReactElement } from "react";
import { FunctionlessWindow } from "../WindowExample";
import { Icons } from "../../../sdk/components/Enum";
import Beanpowered from "../components/BeanpoweredDemo";
const ani={
  initial:{opacity:0,y:15,},
  whileInView:{opacity:1,y:0,},
  viewport:{once:true}
};
const winVariant:Variants={
  hidden:{opacity:0,y:30},
  visible:{
    opacity:1,
    y:0,
    transition:{
      duration:.35
    }
  },
};
interface IBackgroundItems{
  index:number;
  bg:number;
}
const S3=():ReactElement=>{
  const BackgroundItem=({index,bg}:IBackgroundItems)=>{
    return(<motion.div
      initial={{opacity:0,y:25}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      transition={{duration:.5,delay:.25+(.25*Math.pow(1.35,index))}}
      style={{backgroundImage:`url("/assets/homepage/gs/${bg+1}.png")`}}
      className="backgroundItem"/>);
  }
  return(<motion.section className="s3">
    <motion.div className="shade"></motion.div>
    <motion.div className="background">
      <motion.div 
        className="ticker"
        animate={{x:["0%","-50%","0%"]}}
        transition={{ease:"linear",duration:45,repeat:Infinity}}>
          {Array.from({length:10}).map((_,i)=>(
            <BackgroundItem key={i} index={i} bg={i}/>))}
      </motion.div>
      <motion.div 
        className="ticker"
        animate={{x:["-50%","0%","-50%"]}}
        transition={{ease:"linear",duration:45,repeat:Infinity}}>
          {Array.from({length:10}).map((_,i)=>(
            <BackgroundItem key={i} index={i} bg={i+10}/>))}
      </motion.div>
      <motion.div 
        className="ticker"
        animate={{x:["0%","-50%","0%"]}}
        transition={{ease:"linear",duration:45,repeat:Infinity}}>
          {Array.from({length:10}).map((_,i)=>(
            <BackgroundItem key={i} index={i} bg={i+20}/>))}
      </motion.div>
    </motion.div>
    <motion.div className="rowWrapper">
        <motion.div className="left">
          <motion.h1 {...ani} transition={{duration:.25,delay:.25}}>Games</motion.h1>
          <motion.p {...ani} transition={{duration:.25,delay:.5}}>
            Beansite's new advanced system for hosting games is 
            a massive leap forward. We've spent countless days 
            and nights patching our biggest issues. With local 
            content distribution networks put in place to replace 
            the previously problematic outsourced ones, we can 
            confidently say that our game hosting system is 
            now the best it has ever been.
          </motion.p>
        </motion.div>
        <motion.div className="right">
          <FunctionlessWindow 
            style={{
              height:"100% !important",
              width:"100% !important",
            }}
            {...ani}
            transition={{duration:.25,delay:.75}}
            winContentStyle={{overflow:"hidden !important",}}
            variants={winVariant}
            icon={Icons.beanpowered}
            title="Beanpowered">
              <Beanpowered launchFunc={false}/>
          </FunctionlessWindow>
        </motion.div>
    </motion.div>
  </motion.section>);
};
export default S3;
