import { Tabs } from "@base-ui/react";
import type { ReactElement } from "react";
import "./style.scss";
import { motion } from "motion/react";
const TaskMgr=({}):ReactElement=>{
  const Proccesses=({}):ReactElement=>{
    return(<>
    </>);
  };
  return(<><motion.div id="taskmgr">
    <Tabs.Root defaultValue="home">
      <Tabs.List className="list">
        <Tabs.Tab className="tab" value="proccesses">Proccesses</Tabs.Tab>
        <Tabs.Indicator className="indicator"/>
      </Tabs.List>
      <Tabs.Panel className="panel" value="proccesses">
        <Proccesses/>
      </Tabs.Panel>
    </Tabs.Root>
    </motion.div></>);
};
export default TaskMgr;