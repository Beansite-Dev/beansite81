import WidgetBotEmbed from '@widgetbot/react-embed';
const WidgetBot=(WidgetBotEmbed as any).default??WidgetBotEmbed;
import "./style.scss";
import { motion } from 'motion/react';
import type { ReactElement } from 'react';
const onAPI=(api:typeof WidgetBot['api']) => {
  api.on('signIn',(user:{username:any;})=>{
    console.log(`User signed in as ${user.username}`, user)
  })
}
const Beancord=({}):ReactElement=>{
  return(<><motion.div>
    <WidgetBot
      className="beancord"
      onAPI={onAPI}
      channel="1507852543928303716"
      server="1507576793022857366"/>
  </motion.div></>);
}
export default Beancord;