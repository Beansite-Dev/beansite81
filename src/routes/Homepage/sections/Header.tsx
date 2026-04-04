import { motion } from "motion/react";
import type { Variants } from "motion/react";
import type { ReactElement } from "react";
import Typewriter from 'typewriter-effect';
import { FunctionlessWindow } from "../WindowExample";
import { Icons } from "../../../sdk/components/Enum";
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
const Header=():ReactElement=>{
  return(<motion.header>
    <motion.div className="shade"></motion.div>
    <motion.div className="background"></motion.div>
    <motion.div className="SectWrap">
      <motion.div 
        {...ani}
        transition={{duration:.25}}
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
        {...ani}
        transition={{duration:.25,delay:.15}}
        className="Logo">Beansite</motion.span>
      <motion.div className="rowWrapper">
        <a href="/app"><motion.button
          {...ani}
          className="button"
          transition={{duration:.15,delay:.25}}>
            Go To App
        </motion.button></a>
        <motion.button
          {...ani}
          className="button"
          transition={{duration:.15,delay:.5}}>
            Learn More
        </motion.button>
      </motion.div>
    </motion.div>
    <motion.div className="windowExampleWrapper">
      <motion.div 
        className="windowRotateWrapper"
        initial="hidden"
        whileInView="visible"
        viewport={{once:true}}
        variants={{
          hidden:{},
          visible:{transition:{staggerChildren:0.15,delayChildren:0.25}}
        }}>
          <FunctionlessWindow 
            variants={winVariant}
            icon={Icons.beanpowered}
            title="Beanpowered">
              <motion.div className="bpdemoss"></motion.div>
              {/* <Beanpowered/> */}
          </FunctionlessWindow>
          <FunctionlessWindow 
            variants={winVariant}
            icon={Icons.configApplication}
            title="Test Window 2">
          </FunctionlessWindow>
          <FunctionlessWindow 
            variants={winVariant}
            icon={Icons.configApplication}
            title="Test Window 3">
          </FunctionlessWindow>
          <FunctionlessWindow 
            variants={winVariant}
            icon={Icons.configApplication}
            title="Test Window 4">
          </FunctionlessWindow>
      </motion.div>
    </motion.div>
  </motion.header>);
};
export default Header;
