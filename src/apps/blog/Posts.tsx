import type { CSSProperties, ReactElement } from "react";
import { generateId } from "../../sdk/Lib";
export const Posts:{
  title:string;
  id:string;
  pinned:boolean;
  uuid:string;
  author:string;
  date:string;
  headerbg:string;
  customHeaderStyle?:CSSProperties;
  customHeaderBgStyle?:CSSProperties;
  content:ReactElement|ReactElement[];
}[]=[
  {
    title: "pkSmp Partnership",
    id: "pksmp",
    pinned: false,
    customHeaderStyle:{lineHeight:1.5},
    uuid: generateId(10),
    author: "nickgencs",
    date: "5/22/2026",
    headerbg: "/apps/beanforged/pk.png",
    customHeaderBgStyle:{backgroundSize:"110%"},
    content:<>
      <h1>Introduction</h1>
      <p>
        pkSmp is a Minecraft anarchy server where there are no rules, with no bans. Everything 
        is fully allowed with a player-driven economy, history, and map.
      </p>
      <h1>About This Server</h1>
      <p>
        This server runs on the newest Minecraft versions, so players always stay 
        updated with modern gameplay and features.
      </p>
      <p>
        It supports Java Edition, Bedrock Edition, mobile, console, and browser Minecraft 
        like Eaglercraft.
      </p>
      <h1>Beansite Collab</h1>
      <p>
        I am working with the one and only Beansite to help distribute and spread the server so more 
        players can join. Beansite has offered to host their won version of the servers website to
         help people play it easily in their browser using Beanforged.
      </p>
      <p>
        Together, pkSmp and Beansite are working to expand our fully cross-platform anarchy server.
      </p>
      <h1>Why People Join</h1>
      <p>
        The map resets. Nothing is permanent and everything is shaped only by players. This creates a 
        constantly changing survival world where history is made by the community. And no bans for what 
        you decide to do.
      </p>
      <h1>Versions Supported</h1>
      <ul>
          <li>Browser (Eaglercraft)</li>
          <li>Java Edition (PC / Mac / Linux)</li>
          <li>Bedrock Edition (Mobile / Console / Windows)</li>
      </ul>
      <p>
        Cross-platform compatibility between all of them. Same chaos with all your friends, 
        no matter their device or version.
      </p>
      <p>Join now on Beanforged - pkSmp.net</p>
      <p>
        The Minecraft server IP, live map, and all news are shared inside our Discord.
        No invite limits, no gatekeeping.
      </p>
      <p>
        Join the pkSmp Discord<br/>
        Or copy this address: discord.pksmp.net/<br/>
        ✦ pkSmp + Beansite · zero rules · anarchy ✦
      </p>
      <p>
        no bans. Everything is possible. Play on your PC, phone, console, tablet, or browser.
        Or maybe even a school computer😉
      </p>
      <p>See you in the chaos.</p>
      <p>⚠️ No rules. Build or destroy whatever you want. Craft your own story. ⚠️</p>
    </>,
  },{
    title: "First Entry",
    id: "init",
    pinned: true,
    uuid: generateId(10),
    author: "m1dnight",
    date: "5/13/2026",
    headerbg: "/wallpaper/seeds.png",
    content:<>
      <h1>Hello Again (again)</h1>
      <p>
          I'm proud to see how far Beansite has come, 
          with revamped versions of all the original features,
          and better systems in place holding our enormous 
          backend together. I'd love to thank everyone for a 
          combined view count of over 300k and userbase of 
          50k. I would've never expected to be here when I 
          started this.
      </p>
      <p>
          Obviously, this is just regurgiation from our new 
          homepage (which took forever btw), so I'd like 
          to actually provide some more info about everything 
          that's been going.
      </p>
      <p>
          Despite our massive user base, my motivation has
          faltered, to be so honest with everyone. Obviously,
          I'm back, but that might explain why this has taken 
          so long. I learned Typescript and rewrote everything 
          from scratch with much needed improvements. 
      </p>
      <p>
          We've also grown a team of 3, where we will continue
          to find and unblock more games for everyone to use.
          We've also made our first official partner, which I
          will go more into the next artical.
      </p>
      <p>
          Overall, my hopes are high, and I cannot wait to 
          release Beansite 8.1.
      </p>
    </>,
  }
];