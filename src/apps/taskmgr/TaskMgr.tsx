import { Tabs } from "@base-ui/react";
import { useState, type ReactElement } from "react";
import "./style.scss";
import { motion } from "motion/react";
import { ExpressDerivedWinModifierAtom, type IWinObj } from "../../sdk/store";
import { useAtom } from "jotai";
//https://www.chartjs.org/docs/latest/
const TaskMgr=({}):ReactElement=>{
  const Processes=({}):ReactElement=>{
    const[windows,setWindow]=useAtom(ExpressDerivedWinModifierAtom);
    const[selectedProcess,setSelectedProcess]=useState<null|IWinObj>(null);
    return(<>
      {/* //! doesnt fucking work oh my god */}
      {/* <motion.div className="processes">
        <motion.div className="row">
          <motion.div className="processesHeader r r1">
            <motion.span className="title">Name</motion.span>
          </motion.div>
          <motion.div className="processesHeader r r2">
            <motion.span className="percentage">1%</motion.span>
            <motion.span className="title">CPU</motion.span>
          </motion.div>
          <motion.div className="processesHeader r r3">
            <motion.span className="percentage">40%</motion.span>
            <motion.span className="title">Memory</motion.span>
          </motion.div>
        </motion.div>
        <motion.div className="row">
          <motion.div className="r r1 h2">
            Apps (###)
          </motion.div>
          <motion.div className="r r2"></motion.div>
          <motion.div className="r r3"></motion.div>
        </motion.div>
      </motion.div> */}
      <motion.div className={"processesFooter"}>
        <motion.button className={!!selectedProcess?"enabled":"disabled"}>End task</motion.button>
      </motion.div>
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