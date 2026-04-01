import { motion } from "motion/react";
import "./style/Beanpowered.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faDownload, faPlus, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { Tabs } from '@base-ui/react/tabs';
import { ARCHIVE_games as games } from "../../sdk/components/store/games.old";
import { useState, type ReactElement } from "react";
import GameUI from "./components/GameUI/GameUI";

const Beanpowered=():ReactElement=>{
  const[searchRes,setSearchRes]=useState<typeof games>(games);
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
                ? Object.keys(games)
                    .filter((key)=>key.toLowerCase().includes(e.target.value.toLowerCase()))
                    .reduce<typeof games>((obj,key)=>{
                      obj[key]=games[key];
                      return obj;
                    },{})
                : games
            );
          }}
          id="bp_SearchBar"></motion.input>
      </motion.div>
      <Tabs.Root className="bp_tabs" defaultValue="slope">
        <Tabs.List className="bp_sidebar">
          {Object.keys(searchRes)
            .reduce<string[]>((obj,key)=>{
              if(games[key].working)obj.push(key);
              return obj;
            },[])
            .map((name)=>(
              <Tabs.Tab key={games[name].id} className={`bpsb_item ${!games[name].working?"nonfunc":""}`} value={games[name].id}>
                <motion.div
                  className="bpsbi_icon"
                  style={{backgroundImage:`url("/apps/beanpowered/gicon/${games[name].id}.png")`}}></motion.div> <span className="bpsbi_txt">{name}</span>
              </Tabs.Tab>
            ))}
          {Object.keys(searchRes)
            .reduce<string[]>((obj,key)=>{
              if(!games[key].working)obj.push(key);
              return obj;
            },[])
            .map((name)=>(
              <Tabs.Tab key={games[name].id} className={`bpsb_item ${!games[name].working?"nonfunc":""}`} value={games[name].id}>
                <motion.div
                  className="bpsbi_icon"
                  style={{backgroundImage:`url("/apps/beanpowered/gicon/${games[name].id}.png")`}}></motion.div> <span className="bpsbi_txt">{name}</span>
              </Tabs.Tab>
            ))}
          <Tabs.Indicator className="bp_TabIndicator" />
        </Tabs.List>
        {Object.keys(games).map((name)=>(
          <Tabs.Panel key={games[name].id} className="bp_panel" id={`tabpanel${games[name].id}`} value={games[name].id}>
            <GameUI gamedata={games[name]} gamename={name} />
          </Tabs.Panel>
        ))}
      </Tabs.Root>
    </div>
  </>);
};
export default Beanpowered;