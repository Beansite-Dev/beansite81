import { motion } from "motion/react";
import type { ReactElement } from "react";
import { Helmet } from "react-helmet-async";
import { Flash } from "react-ruffle";
import "./style.scss";
import games from "../../sdk/components/store/games";
//https://github.com/lacymorrow/react-ruffle
interface IRufflePage{path:string;name:string;id:string;}
interface IRufflePlayer{path:string;};
export const RufflePlayer=({path}:IRufflePlayer):ReactElement=>{
  return(<Flash 
    className="ruffle"
    src={path}
    config={{
      autoplay:"off",
      parameters:{}
    }}>
    <p>{path}</p>
  </Flash>);
}
const RufflePage=({path,name,id}:IRufflePage):ReactElement=>{
  return(<>
    <Helmet>
      <title>{name} - ruffle:{id} - {path}</title>
    </Helmet>
    <motion.div className='RufPageWrapper'>
      <RufflePlayer {...{path}} />
    </motion.div>
  </>);
}
export default RufflePage;