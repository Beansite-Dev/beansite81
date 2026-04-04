import { motion } from "motion/react";
import type { ReactElement } from "react";
const ani={
  initial:{opacity:0,y:15,},
  whileInView:{opacity:1,y:0,},
  viewport:{once:true}
};
const S1=():ReactElement=>{
  return(<motion.section className="s1">
    <motion.h1
      {...ani}
      transition={{duration:.25}}>An Unexpected Success</motion.h1>
    <motion.p
      {...ani}
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
      {...ani}
      transition={{duration:.25,delay:.25}}
      className="rightWrap">
        <motion.span className="signature">-Tyler Vaz</motion.span><br/>
        Creator and Lead Developer of Beansite
    </motion.div>
  </motion.section>);
};
export default S1;
