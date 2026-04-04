import { motion } from "motion/react";
import type { ReactElement } from "react";
const S2=():ReactElement=>{
  return(<motion.section className="s2">
    {/* mb7 took 00:12.56, m81 took 00:02.37 */}
    {/* more than 5 times faster */}
    <motion.div className="shade"></motion.div>
    <motion.div className="background"></motion.div>
    <motion.h1
        viewport={{once:true}}
        initial={{opacity:0,y:15,rotateX:"-5deg",}}
        whileInView={{opacity:1,y:0,rotateX:"-15deg",}}
        transition={{duration:.25}}>Unparalleled Speed</motion.h1>
    <motion.div 
      viewport={{once:true}}
      initial={{opacity:0,y:35,}}
      whileInView={{opacity:1,y:0,}}
      transition={{duration:.25,delay:.25}}
      className="timesWrapper">
        <motion.span className="small">More than</motion.span>
        <motion.span className="large">x5</motion.span>
        <motion.span className="small">Faster</motion.span>
    </motion.div>
    <motion.div className="Wrapper">
      <motion.div 
        viewport={{once:true}}
        initial={{opacity:0,y:35,rotateX:"20deg",}}
        whileInView={{opacity:1,y:0,rotateX:"30deg",}}
        transition={{duration:.25,delay:.5}}
        className="mb7load">
          <motion.span>00:12.56</motion.span>
      </motion.div>
      <motion.div 
        viewport={{once:true}}
        initial={{opacity:0,y:35,rotateX:"20deg",}}
        whileInView={{opacity:1,y:0,rotateX:"30deg",}}
        transition={{duration:.25,delay:.75}}
        className="mb81load">
          <motion.span>00:02.37</motion.span>
      </motion.div>
    </motion.div>
    <motion.p>Tests were conducted on HP Chromebook 11 G8 EE, results may vary</motion.p>
  </motion.section>);
};
export default S2;
