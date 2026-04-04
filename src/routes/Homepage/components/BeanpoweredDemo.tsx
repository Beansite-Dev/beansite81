import { motion } from "motion/react";
import "./BeanpoweredDemo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faDownload, faPlus, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { Tabs } from '@base-ui/react/tabs';
import gamesSrc,{type IGame} from "../../../sdk/components/store/games";
import { useState, type ReactElement } from "react";
import GameUI from "./GameUIDemo";
export const games:IGame[]=[
  ...gamesSrc.ruf,
  ...gamesSrc.dos,
  ...gamesSrc.gen,
];
const Beanpowered=({launchFunc=true}:{launchFunc?:boolean;}):ReactElement=>{
  const[searchRes,setSearchRes]=useState<IGame[]>(games);
  return(<>
    <div id="bp_appwrapper">
      <motion.div id="bp_navbar">
        <motion.button className="bpnb_navbtn">
          <FontAwesomeIcon icon={faArrowLeft} />
        </motion.button>
        <motion.button className="bpnb_navbtn">
          <FontAwesomeIcon icon={faArrowRight} />
        </motion.button>
        <br/>
        <motion.button
          className="bpnb_button selected"
          onClick={()=>{}}
          id="">Library</motion.button>
        <motion.button className="bpnb_button" id="">
          User
        </motion.button>
      </motion.div>
      <motion.div id="bp_footer">
        <motion.button className="bpf_button bottom">
          <div><FontAwesomeIcon icon={faPlus} /></div> Add a Game
        </motion.button>
        <motion.button className="bpf_button center">
          <div><FontAwesomeIcon icon={faDownload} /></div> Manage Downloads
        </motion.button>
        <motion.button className="bpf_button right">
          Friends & Chat <div><FontAwesomeIcon icon={faUserFriends} /></div>
        </motion.button>
      </motion.div>
      <motion.div id="bpsb_searchbar">
        <motion.input
          onChange={(e)=>{
            setSearchRes(
              e.target.value
                ? games.filter((g)=>g.name.toLowerCase().includes(e.target.value.toLowerCase()))
                : games
            );
          }}
          id="bp_SearchBar"></motion.input>
      </motion.div>
      <Tabs.Root className="bp_tabs" defaultValue="slope">
        <Tabs.List className="bp_sidebar">
          {searchRes
            .filter((g)=>g.working)
            .map((g)=>(
              <Tabs.Tab key={g.id} className={`bpsb_item ${!g.working?"nonfunc":""}`} value={g.id}>
                <motion.div
                  className="bpsbi_icon"
                  style={{backgroundImage:`url("/apps/beanpowered/gicon/${g.id}.png")`}}></motion.div> <span className="bpsbi_txt">{g.name}</span>
              </Tabs.Tab>
            ))}
          {searchRes
            .filter((g)=>!g.working)
            .map((g)=>(
              <Tabs.Tab key={g.id} className={`bpsb_item ${!g.working?"nonfunc":""}`} value={g.id}>
                <motion.div
                  className="bpsbi_icon"
                  style={{backgroundImage:`url("/apps/beanpowered/gicon/${g.id}.png")`}}></motion.div> <span className="bpsbi_txt">{g.name}</span>
              </Tabs.Tab>
            ))}
          <Tabs.Indicator className="bp_TabIndicator" />
        </Tabs.List>
        {games.map((g)=>(
          <Tabs.Panel key={g.id} className="bp_panel" id={`tabpanel${g.id}`} value={g.id}>
            <GameUI 
              launchFunc={launchFunc} 
              gamedata={g} 
              gamename={g.name}/>
          </Tabs.Panel>
        ))}
      </Tabs.Root>
    </div>
  </>);
};
export default Beanpowered;