import { motion } from "motion/react";
import type { Variants } from "motion/react";
import type { ReactElement } from "react";
import "./style.scss";
import Typewriter from 'typewriter-effect';
import { FunctionlessWindow } from "./WindowExample";
import { Icons } from "../../sdk/components/Enum";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';  
import Beanpowered from "./components/BeanpoweredDemo";
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
const Homepage=({}):ReactElement=>{
  const BackgroundItem=({index,bg}:IBackgroundItems)=>{
    return(<motion.div
      initial={{opacity:0,y:25}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      transition={{duration:.5,delay:.25+(.25*Math.pow(1.35,index))}}
      style={{backgroundImage:`url("/assets/homepage/gs/${bg+1}.png")`}}
      className="backgroundItem"/>);
  }
  return(<>
    <motion.header>
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
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.25 } }
          }}>
            <FunctionlessWindow 
              variants={winVariant}
              icon={Icons.beanpowered}
              title="Beanpowered">
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
    </motion.header>
    <motion.section className="s1">
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
      <motion.p>Tests were conducted on HP Chromebook 11 G8 EE, results may vary</motion.p>
    </motion.section>
    <motion.section className="s3">
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
                height: "100% !important",
                width: "100% !important",
              }}
              {...ani}
              transition={{duration:.25,delay:.75}}
              winContentStyle={{overflow: "hidden !important",}}
              variants={winVariant}
              icon={Icons.beanpowered}
              title="Beanpowered">
                <Beanpowered launchFunc={false}/>
            </FunctionlessWindow>
          </motion.div>
      </motion.div>
    </motion.section>
    <motion.footer>
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
    </motion.footer>
  </>);
};
export default Homepage;