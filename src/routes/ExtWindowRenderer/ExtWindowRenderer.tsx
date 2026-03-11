import { motion } from "motion/react";
import { type ReactElement } from "react";
import { Helmet } from "react-helmet-async";
import "./style.scss";
const ExtWindowRenderer=({}):ReactElement=>{
  return(<>
    <Helmet>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/assets/favicon_modern.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Beansite 8.1 - ExtWindowRenderer</title>
    </Helmet>
    <motion.div className="extWindowRenderer">
      <motion.div id="bg"></motion.div>
      <motion.div id="grid"></motion.div>
      <motion.header id="pageHeader">
        <motion.h1 id="logo">extwinrenderer</motion.h1>
        <motion.h1 id="version">v0.0.1</motion.h1>
        <motion.div className="spacer"></motion.div>
      </motion.header>
      <motion.div className="mainWrapper">
        
      </motion.div>
    </motion.div>
  </>);
}
export default ExtWindowRenderer;