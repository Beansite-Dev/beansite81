import { motion } from "motion/react";
import type { ReactElement } from "react";
import "./style.scss";
import { Tabs } from "@base-ui/react/tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
const Beanforged=({}):ReactElement=>{
  return(<>
    <motion.div id="bf_appwrapper">
    <Tabs.Root orientation="vertical" defaultValue="home">
      <Tabs.List id="bf_sidebar" activateOnFocus loopFocus>
        <Tabs.Tab value="home" className="bf_sb_icon">
          <FontAwesomeIcon icon={faHome} />
        </Tabs.Tab>
        <Tabs.Tab value="create" className="bf_sb_icon">
          <FontAwesomeIcon icon={faPlus} />
        </Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="home"></Tabs.Panel>
      {/* <Tabs.Panel value="create"></Tabs.Panel> */}
    </Tabs.Root>
    </motion.div>
  </>);
}
export default Beanforged;