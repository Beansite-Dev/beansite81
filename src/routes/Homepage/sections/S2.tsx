import { motion } from "motion/react";
import { useEffect, useRef, useState, type ReactElement } from "react";
import NumberFlow from '@number-flow/react'
const S2=():ReactElement=>{
  const containerRef=useRef<HTMLDivElement>(null);
  const[mb7TimeVal,setMb7TimeVal]=useState<number>(0);
  const[mb81TimeVal,setMb81TimeVal]=useState<number>(0);
  const[timeVal,setTimeVal]=useState<number>(0);
  useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){
        setMb7TimeVal(12.56);
        setMb81TimeVal(2.37);
        setTimeVal(5);
        observer.disconnect(); 
      }
    },{threshold:.2});
    if(containerRef.current)observer.observe(containerRef.current);
    return () => observer.disconnect();
  },[]);
  return(<motion.section className="s2" ref={containerRef}>
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
        <motion.span className="large">
          <NumberFlow 
            prefix="x"
					  format={{ minimumIntegerDigits: 1 }}
            transformTiming={{ delay:0, duration: 2500, easing: 'cubic-bezier(1, 0.005, 0.56, 1.452)' }}
            value={timeVal}/>
        </motion.span>
        <motion.span className="small">Faster</motion.span>
    </motion.div>
    <motion.div className="Wrapper">
      <motion.div 
        viewport={{once:true}}
        initial={{opacity:0,y:35,rotateX:"20deg",}}
        whileInView={{opacity:1,y:0,rotateX:"30deg",}}
        transition={{duration:.25,delay:.5}}
        className="mb7load">
          <motion.span>
            00<NumberFlow
              prefix=":"
              digits={{1:{max:2}}}
					    format={{ minimumIntegerDigits: 2 }}
              transformTiming={{ delay:500, duration: 3000, easing: 'linear(0, 0.029 1.3%, 0.119 2.8%, 0.659 8.7%, 0.871 11.6%, 1.009 14.6%, 1.052 16.2%, 1.078 17.9%, 1.088 19.7%, 1.085 21.7%, 1.014 31.4%, 0.993 38%, 1.001 57.6%, 1)' }}
              value={mb7TimeVal}></NumberFlow>
          </motion.span>
      </motion.div>
      <motion.div 
        viewport={{once:true}}
        initial={{opacity:0,y:35,rotateX:"20deg",}}
        whileInView={{opacity:1,y:0,rotateX:"30deg",}}
        transition={{duration:.25,delay:.75}}
        className="mb81load">
          <motion.span>
            00<NumberFlow
              prefix=":"
              digits={{1:{max:2}}}
					    format={{ minimumIntegerDigits: 2 }}
              transformTiming={{ delay:750, duration: 3000, easing: 'linear(0, 0.029 1.3%, 0.119 2.8%, 0.659 8.7%, 0.871 11.6%, 1.009 14.6%, 1.052 16.2%, 1.078 17.9%, 1.088 19.7%, 1.085 21.7%, 1.014 31.4%, 0.993 38%, 1.001 57.6%, 1)' }}
              value={mb81TimeVal}></NumberFlow>
          </motion.span>
      </motion.div>
    </motion.div>
    <motion.p>Tests were conducted on HP Chromebook 11 G8 EE, results may vary</motion.p>
  </motion.section>);
};
export default S2;
