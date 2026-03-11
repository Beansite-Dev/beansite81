import { motion } from "motion/react";
import { lazy, type ReactElement } from "react";
import "./styles/LoadingScreen.scss";
export const Loading=({}):ReactElement=>{
  return(<>
    <motion.div 
      transition={{duration:0}}
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      className="LoadingScreen">
        <motion.div className="Logo"></motion.div>
        <motion.p>Starting Beansite 8.1...</motion.p>
    </motion.div>
  </>);
}