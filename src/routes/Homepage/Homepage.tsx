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
        <motion.div className="rowWrapper logoSub">
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
        <motion.span className="Logo">Beansite</motion.span>
        <motion.div className="rowWrapper">
          <a href="/app"><motion.button>
            Go To App
          </motion.button></a>
          <motion.button>
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.header>
    <motion.section className="s1">
      <motion.h1>An Unexpected Success</motion.h1>
      <motion.p>
        Beansite started as a simple HTML project I created 
        to escape boredom in class. I never expected it to 
        grow this much. I'm proud to launch Beansite 8.1, 
        now with TypeScript—something I've wanted to learn 
        for years—and expanded to build the best version of 
        Beansite in its architecture. I've never felt better 
        about any other app. Thanks to all of you for that. 
      </motion.p>
      <motion.div className="rightWrap">
        <motion.span className="signature">-Tyler Vaz</motion.span><br/>
        Creator and Lead Developer of Beansite
      </motion.div>
    </motion.section>
    {/* mb7 took 00:12.56, m81 took 00:02.37 */}
    {/* more than 5 times faster */}
    <motion.section className="s2">
      <motion.div className="shade"></motion.div>
      <motion.div className="background"></motion.div>
      <motion.h1>Unparalleled Speed</motion.h1>
      <motion.div className="timesWrapper">
        <motion.span className="small">More than</motion.span>
        <motion.span className="large">x5</motion.span>
        <motion.span className="small">Faster</motion.span>
      </motion.div>
      <motion.div className="Wrapper">
        <motion.div className="mb7load">
          <motion.span>00:12.56</motion.span>
        </motion.div>
        <motion.div className="mb81load">
          <motion.span>00:02.37</motion.span>
        </motion.div>
      </motion.div>
    </motion.section>
  </>);
};
export default Homepage;