import { motion } from "motion/react";
import "./style/GameUI.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faHeart, faInfoCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { ARCHIVE_games as games } from "../../../../sdk/components/store/games.old";
type GameData=typeof games[keyof typeof games];
const GameUI=({gamedata,gamename}:{gamedata:GameData;gamename:string})=>{
  const s=useRef<HTMLDivElement>(null);
  const ScrollBG=(elm:HTMLElement|null)=>{
    if(!elm)return;
    var scrolltotop=elm.scrollTop;
    var xvalue="center";
    var factor=0.15;
    var yvalue=`calc(50% + ${scrolltotop*factor}px)`;
    const header=document.getElementById(`tabheader${gamedata.id}`);
    if(header){
      header.style.backgroundPosition=xvalue+" "+yvalue;
    }
  };
  useEffect(()=>{
    const panel=document.getElementById(`tabpanel${gamedata.id}`);
    if(panel){
      panel.addEventListener("scroll",(e)=>{
        ScrollBG(e.target as HTMLElement);
      });
    }
  },[gamedata.id]);
  const GUILaunchButton=()=>{
    return(
      <motion.button
        id="GUI_launch"
        onClick={(e)=>{
          e.preventDefault();
          var win=window.open("",gamename,"toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=640,height=360,top=100,left=100");
          if(win){
            win.document.documentElement.innerHTML=`
              <title>${gamename}</title>
              <link rel="icon" type="image/x-icon" href="${`/apps/beanpowered/gicon/${gamedata.id}.png`}">
              <iframe src="${gamedata.url}" 
                allowfullscreen
                style="
                  height:100dvh;
                  width:100dvw;
                  position:fixed;
                  top:50%;
                  left:50%;
                  translate:-50% -50%;"/>`;
          }
        }}>
        <FontAwesomeIcon icon={faPlay} /> Launch
      </motion.button>
    );
  };
  return(<>
    <motion.div
      ref={s}
      id={`tabheader${gamedata.id}`}
      style={{backgroundImage:`url("/apps/beanpowered/gbanner/${gamedata.id}.png")`}}
      className="GUI_Header">
      {<motion.div className="GUI_BGFade"></motion.div>}
    </motion.div>
    <motion.div className="GUI">
      <motion.div
        style={{backgroundImage:`url("/apps/beanpowered/gicon/${gamedata.id}.png")`}}
        className="GUI_icon"></motion.div>
      <motion.div className="GUI_ribbon">
        <GUILaunchButton />
        <motion.div className="infoWrapper">
          <motion.span className="infoWrapperHeader">Usage Time</motion.span>
          <motion.span className="infoWrapperValue">{Math.floor(Math.random()*100*10)/10} hours</motion.span>
        </motion.div>
        <div className="spacer" />
        <motion.button
          className="GUI_ActionButton">
          <FontAwesomeIcon icon={faGear} />
        </motion.button>
        <motion.button
          className="GUI_ActionButton">
          <FontAwesomeIcon icon={faInfoCircle} />
        </motion.button>
        <motion.button
          className="GUI_ActionButton">
          <FontAwesomeIcon icon={faHeart} />
        </motion.button>
      </motion.div>
      <motion.div className="GUI_selectionWrapper">
        <motion.div className="GUI_selectionTabs">
          <motion.button className="GUI_selectionTab">Store Page</motion.button>
          <motion.button className="GUI_selectionTab">Community Hub</motion.button>
          <motion.button className="GUI_selectionTab">Discussions</motion.button>
        </motion.div>
      </motion.div>
      <motion.div className="GUI_contentWrapper">
        <motion.div className="GUI_statusWrapper">
          <motion.span className="GUI_status">
            Current Game Status:
            <motion.span
              className={`
              GUI_currentStatusCircle 
              ${gamedata.working===true?"Green"
               :gamedata.working===undefined?"Gray"
               :gamedata.working==="y"?"Yellow"
               :gamedata.working===false?"Red"
               :"Gray"}`}></motion.span>
          </motion.span>
          <motion.span className="GUI_status">Status Message: {gamedata.status?gamedata.status:"Unchecked"}</motion.span>
          <motion.span className="GUI_status">Last Checked: {gamedata.vdate?gamedata.vdate:"Never"}</motion.span>
        </motion.div>
        <motion.div className="GUI_postWrapper">
          <motion.div className="GUI_description">
            <motion.h2>Description</motion.h2>
            <motion.p>{gamedata.desc?gamedata.desc:"This game has no description"}</motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  </>);
};

export default GameUI;
