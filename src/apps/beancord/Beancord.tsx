import WidgetBotEmbed from '@widgetbot/react-embed';
const WidgetBot=(WidgetBotEmbed as any).default??WidgetBotEmbed;
import "./style.scss";
import { motion } from 'motion/react';
import type { ReactElement } from 'react';
const Beancord=({}):ReactElement=>{
  return(<><motion.div>
    <WidgetBot
      className="beancord"
      onAPI={(api:WidgetBotEmbed["api"])=>{
        api.emit('login');
        api.on('signIn',(user)=>{
          //@ts-expect-error
          console.warn(`Guest signed in as ${user.name}`);
        });
      }}
      channel="1507852543928303716"
      server="1507576793022857366"/>
  </motion.div></>);
}
export default Beancord;