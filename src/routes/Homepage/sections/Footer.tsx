import { motion } from "motion/react";
import type { ReactElement } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
const ani={
  initial:{opacity:0,y:15,},
  whileInView:{opacity:1,y:0,},
  viewport:{once:true}
};
const Footer=():ReactElement=>{
  return(<motion.footer>
    <motion.div className="brandColumn">
      <motion.h1 {...ani} transition={{duration:.25}}>Beansite</motion.h1>
      <motion.p {...ani} transition={{duration:.25,delay:.125}}>Copyright © 2026 M1dnight. All rights reserved.</motion.p>
      <motion.p {...ani} transition={{duration:.25,delay:.25}}>Made with <FontAwesomeIcon icon={faHeart} /> in New Jersey</motion.p>
    </motion.div>
    <motion.div className="linksWrapper">
      <motion.div className="linkColumn">
        <motion.h3 {...ani} transition={{duration:.25,delay:.125}}>Resources</motion.h3>
        <motion.a {...ani} transition={{duration:.25,delay:.2}} href="https://github.com/Beansite-Dev">Github</motion.a>
        <motion.a {...ani} transition={{duration:.25,delay:.275}} href="https://tiktok.com/@beansite">Tiktok</motion.a>
        <motion.a {...ani} transition={{duration:.25,delay:.35}} href="https://forms.gle/1VVrrSnq1Q8Q24iR7">Bug Submission Form</motion.a>
        <motion.a {...ani} transition={{duration:.25,delay:.425}} href="https://forms.gle/WFD79jZhB7wBeuhR6">Games Request Form</motion.a>
        <motion.h3 {...ani} transition={{duration:.25,delay:.5}}>Beansite 95</motion.h3>
        <motion.a {...ani} transition={{duration:.25,delay:.575}} href="https://mb95.vercel.app/">App</motion.a>
        <motion.a {...ani} transition={{duration:.25,delay:.65}} href="https://github.com/Beansite-Dev/beansite-95">Source Code</motion.a>
      </motion.div>
      <motion.div className="linkColumn">
        <motion.h3 {...ani} transition={{duration:.25,delay:.25}}>Beansite 8.1</motion.h3>
        <motion.a {...ani} transition={{duration:.25,delay:.325}} href="/">Homepage</motion.a>
        <motion.a {...ani} transition={{duration:.25,delay:.4}} href="/app">App</motion.a>
        <motion.a {...ani} transition={{duration:.25,delay:.475}} href="/extwr">External Window Renderer</motion.a>
        <motion.a {...ani} transition={{duration:.25,delay:.55}} href="https://github.com/Beansite-Dev/beansite81">Source Code</motion.a>
      </motion.div>
      <motion.div className="linkColumn">
        <motion.h3 {...ani} transition={{duration:.25,delay:.375}}>Beansite 7</motion.h3>
        <motion.a {...ani} transition={{duration:.25,delay:.45}} href="https://mb7.vercel.app/">App</motion.a>
        <motion.a {...ani} transition={{duration:.25,delay:.525}} href="https://github.com/Beansite-Dev/beansite-7">Source Code</motion.a>
      </motion.div>
    </motion.div>
  </motion.footer>);
};
export default Footer;
