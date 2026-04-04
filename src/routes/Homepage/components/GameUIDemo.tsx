import { motion } from "motion/react";
import "./GameUIDemo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faHeart, faInfoCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import gamesSrc,{type IGame} from "../../../sdk/components/store/games";
import { Dialog } from '@base-ui/react/dialog';
import "./Dialog.scss";
const games:Record<string,IGame>=[
  ...gamesSrc.ruf,
  ...gamesSrc.dos,
  ...gamesSrc.gen,
].reduce<Record<string,IGame>>((obj,g)=>{obj[g.name]=g;return obj;},{});
const GameUI=({
  gamedata,
  gamename,
  launchFunc=true
}:{
  gamedata:IGame;
  gamename:string;
  launchFunc?:boolean;
})=>{
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
    const Alert=()=>{
      return(<Dialog.Root>
        <Dialog.Trigger id="GUI_launch"><FontAwesomeIcon icon={faPlay}/> Launch</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop className="Backdrop" />
          <Dialog.Popup className="Popup">
            <Dialog.Title className="Title">Continue On Beansite</Dialog.Title>
            <Dialog.Description className="Description">
              This feature is demo only, please continue on Beansite to play this game.
            </Dialog.Description>
            <div className="Actions">
              <a href="/app"><button className="button bold">Continue</button></a>
              <Dialog.Close 
                className="button transparent">Close</Dialog.Close>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>);
    };
    return(
      <Alert/>
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
            <motion.span className={`GUI_currentStatusCircle ${gamedata.working?"Green":"Red"}`}></motion.span>
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