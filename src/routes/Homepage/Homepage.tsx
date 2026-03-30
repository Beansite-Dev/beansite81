import { motion } from "motion/react";
import type { ReactElement } from "react";
import "./style.scss";
import Typewriter from 'typewriter-effect';
const Homepage=({}):ReactElement=>{
  return(<>
    <motion.header>
      <motion.div className="shade"></motion.div>
      <motion.div className="background"></motion.div>
      <motion.div className="SectWrap">
        <motion.div 
          initial={{opacity:0,y:35,}}
          whileInView={{opacity:1,y:0,}}
          transition={{duration:.25}}
          viewport={{once:true}}
          className="rowWrapper logoSub">
            <motion.span>Our</motion.span>
            <Typewriter options={{
              strings:[
                'Fastest',
                'Most Versatile',
                'Most Featureful',
                'Best'
              ],
              autoStart:true,
              loop:true,
            }}/>
        </motion.div>
        <motion.span 
          initial={{opacity:0,y:35,}}
          whileInView={{opacity:1,y:0,}}
          transition={{duration:.25,delay:.15}}
          viewport={{once:true}}
          className="Logo">Beansite</motion.span>
        <motion.div className="rowWrapper">
          <a href="/app"><motion.button
            initial={{opacity:0,y:35,}}
            whileInView={{opacity:1,y:0,}}
            viewport={{once:true}}
            transition={{duration:.15,delay:.25}}>
              Go To App
          </motion.button></a>
          <motion.button
            initial={{opacity:0,y:35,}}
            whileInView={{opacity:1,y:0,}}
            viewport={{once:true}}
            transition={{duration:.15,delay:.5}}>
              Learn More
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.header>
    <motion.section className="s1">
      <motion.h1
        initial={{opacity:0,y:15,}}
        whileInView={{opacity:1,y:0,}}
        viewport={{once:true}}
        transition={{duration:.25}}>An Unexpected Success</motion.h1>
      <motion.p
        initial={{opacity:0,y:15,}}
        whileInView={{opacity:1,y:0,}}
        viewport={{once:true}}
        transition={{duration:.25,delay:.125}}>
          Beansite started as a simple HTML project I created 
          to escape boredom in class. I never expected it to 
          grow this much. I'm proud to launch Beansite 8.1, 
          now with TypeScript—something I've wanted to learn 
          for years—and expanded to build the best version of 
          Beansite in its architecture. I've never felt better 
          about any other app. Thanks to all of you for that. 
      </motion.p>
      <motion.div 
        initial={{opacity:0,y:15,}}
        whileInView={{opacity:1,y:0,}}
        viewport={{once:true}}
        transition={{duration:.25,delay:.25}}
        className="rightWrap">
          <motion.span className="signature">-Tyler Vaz</motion.span><br/>
          Creator and Lead Developer of Beansite
      </motion.div>
    </motion.section>
    {/* mb7 took 00:12.56, m81 took 00:02.37 */}
    {/* more than 5 times faster */}
    <motion.section className="s2">
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
    </motion.section>
  </>);
};
export default Homepage;