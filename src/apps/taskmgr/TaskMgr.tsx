import { Tabs } from "@base-ui/react";
import type { ReactElement } from "react";
import "./style.scss";
import { motion } from "motion/react";
const TaskMgr=({}):ReactElement=>{
  const Processes=({}):ReactElement=>{
    return(<>
    </>);
  };
  return(<><motion.div id="taskmgr">
    <Tabs.Root defaultValue="home">
      <Tabs.List className="list">
        <Tabs.Tab className="tab" value="processes">Processes</Tabs.Tab>
        <Tabs.Indicator className="indicator"/>
      </Tabs.List>
      <Tabs.Panel className="panel" value="processes">
        <Processes/>
      </Tabs.Panel>
    </Tabs.Root>
    </motion.div></>);
};
export default TaskMgr;