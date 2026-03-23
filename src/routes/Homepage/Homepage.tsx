import { motion } from "motion/react";
import type { ReactElement } from "react";
import "./style.scss";
const Homepage=({}):ReactElement=>{
  return(<>
    <motion.header>
      <motion.div className="shade"></motion.div>
      <motion.div className="SectWrap">
        <motion.div className="h1">
          <motion.span className="small offset">
            Our Fastest
          </motion.span>
          <motion.span className="large gradient">Beansite</motion.span>
          <motion.span className="small">Yet</motion.span>
        </motion.div>
      </motion.div>
      <motion.div className="rowWrapper">
        <a href="/app"><motion.button>
          Go To App
        </motion.button></a>
        <motion.button>
          Learn More
        </motion.button>
      </motion.div>
    </motion.header>
  </>);
};
export default Homepage;