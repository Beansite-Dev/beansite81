import { queryParams } from "../modules/Lib";
const games={
  "Slope": {
    url: "https://kdata1.com/2020/05/slope/",
    id: "slope",
    type: "OpenInGL",
    desc: `Slope is an endless 3D running game where you control a ball on a downhill course. The objective is to navigate the ball to travel as far as possible while avoiding obstacles and staying on the track.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25:  status=Working
  },
  "Slope 2": {
    url: "https://lnahtml.github.io/a6/slope-2/",
    id: "slope2",
    type: "OpenInGL",
    desc: `Slope 2 is the thrilling sequel to the popular endless runner game.\nJust like the original, you control a ball rolling down a series of randomized slopes, but this time the challenge is amped up!\nNavigate through crazier tracks, avoid new obstacles, and test your reflexes as the speed relentlessly increases.\n\nGet ready for an even more intense and addictive experience!`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25:  status=Working
  },
  /* "Geforce Now":{
    url: "https://definitelyscience.com/uv/service/hvtrs8%2F-wuw%2Cntific.aoo%2Fgn%2Fuq%2Feedopcg-lou%2F",
    id: "geforcenow",
    type: "OpenInGL"
  }, */
  "CrazyCattle3D": {
    url: "https://crazy-cattle3d.org/game/crazycattle3d/v11/",
    id: "cc3d",
    type: "OpenInGL",
    desc: `Ever wonder what a cow would do if it just snapped? In CrazyCattle3D, you get to find out. You play as a cow let loose on a farm, and your main goal is to just cause as much chaos as possible. It's a wild 3D adventure with some pretty funny missions to complete along the way.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25:  status=Working
  },
  "1v1.lol": {
    url: "https://1v1.lol",
    id: "1v1lol",
    type: "OpenInGL",
    working: true,
    desc: `1v1.lol is a super fast-paced, competitive shooter where you build and battle at the same time. Think of it as the final circle of a battle royale, but the action starts instantly. It's all about quick reflexes to build cover and even quicker aim to take down your opponent.`,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25:  status=Working
  },
  "Smash Karts": {
    url: "https://smashkarts.io",
    id: "smashk",
    type: "OpenInGL",
    desc: `Smash Karts is a chaotic and fun kart-based combat game. You zip around different arenas, grabbing mystery boxes to get weapons and power-ups, and then try to blow up the other players. It’s pretty much non-stop action from the moment you start.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25:  status=Working
  },
  "Shell Shocker": {
    url: "https://shellshock.io",
    id: "shells",
    type: "OpenInGL",
    desc: "In Shell Shockers, you play as a heavily-armed egg in a first-person shooter. It sounds a bit ridiculous, but it's a surprisingly intense and fun online game. You pick your egg class and weapon and jump into different maps to see who can crack the competition first.",
    working: false,
    status: "Not Working; loading issue",
    vdate: "9/17/25"
    //!verified 9/17/25: status=Not Working; loading issue
    //*verified 8/9/25: status=Working
  },
  "2048 ": {
    url: "https://2048game.com/",
    id: "2048",
    type: "OpenInGL",
    desc: `2048 is a simple yet addictive puzzle game where you slide numbered tiles on a grid. When two tiles with the same number touch, they merge into one, doubling the number. The goal is to keep combining tiles until you create the 2048 tile, all while trying not to fill up the board.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25:  status=Working
  },
  "Final Fantasy VII": {
    url: "https://www.retrogames.cc/embed/43658-final-fantasy-vii-usa-disc-1.html",
    id: "ffvii",
    type: "OpenInGL",
    desc: `Final Fantasy VII is an epic role-playing game that tells a massive story of rebellion and destiny. You play as Cloud Strife, a mercenary who joins an eco-terrorist group to fight against the corrupt Shinra Corporation. It's a huge adventure with memorable characters, a deep story, and a world-threatening villain, Sephiroth.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25:  status=Working
  },
  "Bloxd.io": {
    url: "https://bloxd.io",
    id: "bloxd",
    type: "OpenInGL",
    desc: `Bloxd.io is a blocky, online game that feels a lot like Minecraft but right in your browser. You can jump into different game modes, from peaceful creative building to competitive parkour and survival challenges. It’s a fun, casual game you can hop into and play with others instantly.`,
    working: false,
    status: "Not Working; Cloudflare issue",
    vdate: "9/17/25",
    //!verified 9/17/25: status=Not Working; Cloudflare issue
    //*verified 8/9/25:  status=Working
  },
  "X-Trench Run": {
    url: "https://lagged.com/game-embed/x-trench-run/",
    id: "xtr",
    type: "OpenInGL",
    desc: `In X-Trench Run, you're a starfighter pilot in a high-stakes mission to take down an enemy base. It's a thrilling 3D space shooter where you fly through a narrow trench, dodging obstacles and blasting enemy defenses. The goal is to stay alive and destroy the target at the end of the run.`,
    working: false,
    status: "Not Working; Loading screen forever",
    vdate: "9/17/25",
    //!verified 9/17/25: status=Not Working; Loading screen forever
    //*verified 8/9/25: status=Working
  },
  "Armed Forces": {
    url: "https://armedforces.io",
    id: "armedf",
    type: "OpenInGL",
    desc: `Armed Forces.io is an online, team-based shooter with a modern combat feel. You join a team and battle it out in different environments, using a variety of weapons and vehicles to gain the upper hand. It’s all about strategy and teamwork to capture objectives and defeat the opposing force.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25: status=Working
  },
  /* "Ocarina of Time": {
    // url: "https://static.arcadespot.com/retroemulator.php?system=n64&game=2017/06/the-legend-of-zelda-ocarina-of-time.zip",//"https://www.retrogames.cc/embed/44169-ocarina-of-time-redux.html",
    // url: "https://f.kbhgames.com/r/n64/game.php?file=the-legend-of-zelda-ocarina-of-time.zip",
    // url: "https://www.retrogames.cc/n64-games/ocarina-of-time-redux.html",
    url: "",
    id: "ocarinaot",
    type: "OpenInGL"
    //!verified 8/9/25: status=Not Working
  }, */
  "Super Mario": {
    url: "https://supermario-game.com/mario-game/mario.html",//"https://supermarioplay.com/game/mario.html",
    id: "mario",
    type: "OpenInGL",
    desc: `Super Mario Bros, released in 1985, is a classic side-scrolling platformer that defined a generation of gaming. You play as Mario, a plumber on a quest to rescue Princess Toadstool from the villainous Bowser. You'll run, jump, and stomp on enemies through the Mushroom Kingdom, collecting power-ups like the Super Mushroom and Fire Flower to help you on your way.`,
    working: "y",
    status: "1/2 Working; just fullscreen while it loads",
    vdate: "9/17/25",
    //>verified 9/17/25: status=1/2 Working; just fullscreen while it loads
    //>verified 8/9/25: status=1/2 Working; screen size issue
  },
  /* "Mini Golf Club": {
    url: "https://minigolfclub.io",
    id: "mgclub",
    type: "OpenInGL"
  }, */
  /* "Hole.io": {
    url: "https://hole-io.com",
    id: "hole",
    type: "OpenInGL"
  }, *///>verified 8/9/25: status=1/2 Working; replaced with mobile game ad
  "OvO": {
    url: "https://html5.gamedistribution.com/rvvASMiM/1377b99c10284c229423118a941af3b1/index.html?gd_sdk_referrer_url=https%3A%2F%2Fdinosaur-game.io%2Fovo&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2Rpbm9zYXVyLWdhbWUuaW8vb3ZvIiwicGFyZW50RG9tYWluIjoiZGlub3NhdXItZ2FtZS5pbyIsInRvcERvbWFpbiI6ImRpbm9zYXVyLWdhbWUuaW8iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xNyJ9",
    id: "ovo",
    type: "OpenInGL",
    desc: `OVO is a fast-paced, minimalist platformer where you control a stick figure through challenging levels. The game is all about speed and fluid movement, using a combination of jumps, dives, and slides to overcome obstacles and reach the end as quickly as possible.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25:  status=Working
  },
  "OvO 2": {
    url: "https://dedragames.com/games/ovo2/0.2alpha/",
    id: "ovo2",
    type: "OpenInGL",
    desc: `OVO 2 expands on the original with even more complex levels and new mechanics to master. It keeps the same intense, skill-based parkour gameplay, pushing your reflexes to the limit as you navigate through a series of increasingly difficult stages.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25:  status=Working
  },
  "Retro Bowl": {
    url: "https://game316009.konggames.com/gamez/0031/6009/live/index.html",
    id: "retrob",
    type: "OpenInGL",
    desc: `Retro Bowl is a retro-style American football game that puts you in charge of your own team. You'll manage your roster, call the plays, and take control of the on-field action with simple, satisfying gameplay. It's a love letter to classic sports games with a surprising amount of depth.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25:  status=Working
  },
  "Subway Surfers": {
    url: "https://subwaysurfersgame.io/subway-surfers-game.embed?d=20240530",
    id: "subways",
    type: "OpenInGL",
    desc: `In Subway Surfers, you play as a graffiti artist who's been caught in the act and must run for your life from a grumpy inspector and his dog. It's an endless runner where you dodge trains, leap over obstacles, and collect coins and power-ups to see how far you can get and rack up a high score.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25:  status=Working
  },
  "Deathrun 3D": {
    url: "https://deathrun3d.io",
    id: "dr3d",
    type: "OpenInGL",
    desc: `Deathrun 3D is an intense, first-person parkour game where you have to run and jump your way through a series of treacherous, trap-filled levels. It's all about precision and speed as you try to survive a non-stop obstacle course.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25:  status=Working
  },
  "Friday Night Funkin'": {
    // url: "https://friday-nightfunkin.io/friday-night-funkin",
    url: "https://fnf.kdata1.com/2024/fnf/5201/",
    id: "funkin",
    type: "OpenInGL",
    desc: `Friday Night Funkin' is a wildly popular rhythm game where you play as Boyfriend, who's trying to win the heart of his Girlfriend. To do that, you've got to face off against her dad and a whole cast of other characters in a series of epic rap battles. It's all about hitting the right notes at the right time and keeping up with the beat.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25: status=Working; Fixed to be fullscreen
  },
  /* "Tomb Runner": {
    url: "https://lagged.com/games/tomb-runner7/",
    id: "tombr",
    type: "OpenInGL"
  }, *///!verified 8/9/25: status=Not Working; Fixed to be fullscreen
  "Fallout 1": {
    url: "https://playclassic.games/games/role-playing-dos-games-online/play-fallout-online/play/",
    id: "fallout1",
    type: "OpenInGL",
    desc: `Fallout 1 is a classic, post-apocalyptic RPG that drops you into a world ravaged by nuclear war. You are the Vault Dweller, and you must leave the safety of your underground home, Vault 13, to find a replacement water chip and save your people. It’s a gritty, open-world adventure where every choice matters as you explore the dangerous wasteland.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25:  status=Working
  },
  "Burrito Bison: Launcha Libre": {
    url: "https://mountain658.github.io/BurritoBison.html",
    id: "burritobll",
    type: "OpenInGL",
    desc: `In Burrito Bison: Launcha Libre, you play as a powerful luchador who's had his cookbook stolen by an army of evil gummies. To get it back, you'll launch yourself from a wrestling ring and soar through the air, smashing, bouncing, and flying your way through hordes of gummies. It’s a hilarious and addictive game about launching yourself as far as you can to earn money, upgrade your abilities, and defeat the gummy menace.`,
    working: false,
    status: "Not Working; Black screen",
    vdate: "9/17/25",
    //!verified 9/17/25: status=Not Working; Black screen
    //*verified 8/9/25:  status=Working
  },
  "Tomb of the Mask": {
    url: "https://mountain658.github.io/tombofthemask.html",
    id: "totm",
    type: "OpenInGL",
    desc: `Tomb of the Mask is a fast-paced, retro-style arcade game where you navigate through a series of vertical mazes. You play as a tiny adventurer who discovers a magical mask that lets you climb walls and zip around at lightning speed. The goal is to collect coins, dodge enemies, and outrun a deadly trap that’s constantly rising from the bottom of the screen.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25:  status=Working
  },
  /* "Drive Mad": {
    url: "https://mountain658.github.io/drivemad.html",
    id: "drivem",
    type: "OpenInGL"
  }, *///>verified 8/9/25: status= 1/2 Working; rendered useless 
  "Run 3": {
    // url: "https://mountain658.glitch.me/run3.html",
    // url: "https://run3.io/run3/",
    url: "https://run3-online.io/embed/run-3",
    id: "run3",
    type: "OpenInGL",
    desc: `Run 3 is an endless runner set in space, where you control a little alien running and jumping through a series of tunnels. The twist is that you can run on the walls and ceiling, which completely changes how you approach the game. It's all about quick reflexes as you leap over gaps and avoid falling into the vast emptiness of space, all while discovering new characters and exploring a massive, interconnected map.`,
    working: false,
    status: "Not Working; Network error",
    vdate: "9/17/25",
    //!verified 9/17/25: status=Not Working; Network error
    //*verified 8/9/25:  status=Working; Fixed
  },
  "Celeste": {
    // url: "https://mountain658.glitch.me/celeste.html",
    // url: "https://html-classic.itch.zone/html/235259/Celeste/index.html?v=1542780913",
    url: "/gs/celeste/celeste.html",
    id: "celeste",
    type: "OpenInGL",
    desc: `Celeste is a challenging and beautiful platformer about a young woman named Madeline who decides to climb the mysterious Celeste Mountain. Along the way, she'll have to overcome her own inner demons in a surprisingly deep and touching story. The gameplay is all about precise jumping and dashing through hundreds of hand-crafted, difficult screens.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25:  status=Working; Fixed
  },
  "Jetpack Joyride": {
    url: "https://www.miniplay.com/embed/jetpack-joyride",
    id: "jpjr",
    type: "OpenInGL",
    desc: `In Jetpack Joyride, you play as Barry Steakfries, who breaks into a secret laboratory and steals a high-tech jetpack. It's a classic endless runner where you fly through the lab, dodging missiles, lasers, and other obstacles, all while collecting coins and completing missions to upgrade your gear and see how far you can get.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25:  status=Working
  },
  "Fruit Ninja": {
    url: "https://funhtml5games.com?embed=fruitninja",
    id: "frnin",
    type: "OpenInGL",
    desc: `Fruit Ninja is a simple, yet incredibly satisfying arcade game. Your goal is to slice as much fruit as you can as it's tossed up on the screen, creating juicy combos. But be careful, you have to avoid the bombs, or it's game over! It's all about quick reflexes and seeing how high of a score you can get.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25:  status=Working
  },
  "Flappy Bird": {
    url: "https://playcanv.as/p/2OlkUaxF/",
    id: "flappy",
    type: "OpenInGL",
    desc: `In Flappy Bird, you control a small bird and your only goal is to navigate it through a series of green pipes. You tap the screen to make the bird flap its wings, but the slightest miscalculation will send you crashing. It's a simple, yet incredibly challenging game that became a viral sensation for its addictive and frustrating gameplay.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25: status=Working
  },
  /* "Pokemon Red": {
    url: "https://static.arcadespot.com/retroemulator.php?system=gboy&game=2016/07/pokemon-red.zip",
    id: "pokered",
    type: "OpenInGL"
  }, *///!verified 8/9/25: status=Not Working
  /* "Pokemon Blue": {
    url: "https://static.arcadespot.com/retroemulator.php?system=gboy&game=2016/07/pokemon-blue.zip",
    id: "pokeblue",
    type: "OpenInGL"
  }, *///!verified 8/9/25: status=Not Working
  /* "Street Fighter": {
    url: "https://static.arcadespot.com/retroemulator.php?system=snes&game=2017/10/street-fighter-5.smc",
    id: "streetftr",
    type: "OpenInGL"
  }, *///!verified 8/9/25: status=Not Working
  "Fancade": {
    url: "https://play.fancade.com/#",
    id: "fancade",
    type: "OpenInGL",
    desc: `Fancade is like a giant, ever-expanding arcade filled with thousands of mini-games. It’s a platform where you can play a massive variety of games created by other users, ranging from simple puzzles to complex adventures. On top of that, you can even build your own games using its intuitive and powerful creation tools.`,
    working: false,
    status: "Not Working; Redirect issue",
    vdate: "9/17/25",
    //!verified 9/17/25: status=Not Working; Redirect issue
    //*verified 8/9/25:  status=Working
  },
  "Doom": {
    url: "https://dos.zone/doom-dec-1993/",
    id: "doom",
    type: "OpenInGL",
    desc: `Doom is the iconic first-person shooter that drops you into the boots of a lone space marine, famously known as the Doomguy. You're the last line of defense against a demonic invasion from Hell on a futuristic Martian base. It's a raw and intense experience of navigating maze-like levels, finding secret areas, and blasting your way through hordes of demons with a legendary arsenal of weapons.`,
    working: false,
    status: "Not Working; DOS Zone disallows embeds",
    vdate: "9/17/25",
    //!verified 9/17/25: status=Not Working; DOS Zone disallows embeds
    //*verified 8/9/25:  status=Working
  },
  "Doom II": {
    url: "https://dos.zone/doom-ii-oct-10-1994/",
    id: "doom2",
    type: "OpenInGL",
    desc: `Doom II picks up right where the original left off. After fighting your way through Mars, you return to Earth, only to find it's also been overrun by the forces of Hell. The game throws bigger hordes of demons at you across sprawling levels and introduces the legendary Super Shotgun, making the demon-slaying action even more intense.`,
    working: false,
    status: "Not Working; DOS Zone disallows embeds",
    vdate: "9/17/25",
    //!verified 9/17/25: status=Not Working; DOS Zone disallows embeds
    //*verified 8/9/25:  status=Working
  },
  /* "Doom 64": {
    url: "https://static.arcadespot.com/retroemulator.php?system=n64&game=2017/06/doom-64.zip",
    id: "doom64",
    type: "OpenInGL"
    //!verified 8/9/25: status=Not Working
  }, */
  "Doom 3": {
    url: "https://wasm.continuation-labs.com/d3demo/",
    id: "doom3",
    type: "OpenInGL",
    desc: `Doom 3 reboots the series with a focus on survival horror. It's a much darker and more atmospheric experience that drops you into the UAC's Martian research facility right as a demonic invasion begins. You'll need to use your flashlight to navigate the claustrophobic corridors and fight off terrifying demons that leap from the shadows, creating a tense and immersive sci-fi horror story.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25:  status=Working
  },
  "Baldi's Basics": {
    // url: "https://assets.theludos.com/games/baldis-basics/", //old: https://igroutka.ru/loader/game/26471/
    url: "https://www.gameslol.net/data/baldis-basics/index.html",
    id: "baldis",
    type: "OpenInGL",
    desc: `Baldi's Basics is a weirdly wonderful and slightly terrifying parody of 90s educational games. On the surface, it looks like a simple math game where you collect notebooks. But once you get a question wrong, the game turns into a surreal horror experience where you're stalked by the creepy, ruler-wielding Baldi. It's all about trying to escape the schoolhouse before he catches you.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25: status=Working; Fixed
  },
  "Krunker.io": {
    url: "https://krunker.io",
    id: "krunker",
    type: "OpenInGL",
    desc: `Krunker.io is a fast-paced, first-person shooter with a blocky art style that allows for incredibly fluid, parkour-style movement. You can jump into a match instantly and choose from a variety of classes, each with different weapons and abilities. It's all about high-speed combat, trick shots, and out-maneuvering your opponents in a variety of custom maps.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
    //*verified 8/9/25:  status=Working
  },
  /* "Snake.io": {
    url: "https://snakeio.org/snake-io.embed",
    id: "snakeio",
    type: "OpenInGL"
    //!verified 8/9/25: status=Not Working
  }, */
  "Portal": {
    url: "https://w8.snokido.com/games/flash/ruffle.html?g=portal&v=140524",
    id: "portal",
    type: "OpenInGL",
    desc: `Portal is a groundbreaking first-person puzzle game where you play as Chell, a test subject in the mysterious Aperture Science labs. Armed with a portal gun, you can create two linked wormholes to navigate through a series of increasingly complex and dangerous test chambers. The game is famous for its dark, witty humor and the iconic, malevolent AI, GLaDOS, who guides you through the tests.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
  },
  "Yohoho.io": {
    url: "https://yohoho.io",
    id: "yohohoio",
    type: "OpenInGL",
    desc: `Yohoho.io is a fast-paced multiplayer battle royale game where you play as a pirate on a tropical island. The goal is to be the last pirate standing by eliminating other players. You'll collect gold coins to increase your size and damage, and you must stay within the safe zone as the island shrinks.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
  },
  "Ships 3D": {
    url: "https://games.crazygames.com/en_US/ships-3d/index.html?v=1.288",
    id: "ships3d",
    type: "OpenInGL",
    desc: `Ships 3D is a naval combat simulation game that puts you at the helm of a warship. You engage in realistic sea battles, commanding your vessel and using a variety of weapons like cannons and torpedoes to sink enemy ships. It's a game focused on strategy and tactical positioning in large-scale naval warfare.`,
    working: false,
    status: "Not Working; CrazyGames is Net Blocked",
    vdate: "9/17/25",
    //!verified 9/17/25: status=Not Working; CrazyGames is Net Blocked
  },
  "GunSpin": {
    url: "https://gun-spin.github.io/file/",
    id: "gunspin",
    type: "OpenInGL",
    desc: `GunSpin is a physics-based arcade game where your goal is to launch your gun as far as possible. You do this by repeatedly firing the gun, using the recoil to propel it through the air. With each shot, you have to time it right to keep your momentum going and see how far you can make it fly.`,
    working: false,
    status: "Not Working; URL Has been taken down",
    vdate: "9/17/25",
    //!verified 9/17/25: status=Not Working; URL Has been taken down
  },
  "FNaF 1": {
    url: "https://fnafgame.io/fnaf.embed?ez_iframe=1",
    id: "fnaf1",
    type: "OpenInGL",
    desc: `In Five Nights at Freddy's (FNaF 1), you're a night security guard at Freddy Fazbear's Pizza, a place where the animatronic mascots come to life after hours. Your job is to survive five nights by monitoring security cameras and strategically using a limited amount of power to close the doors and keep the animatronics from reaching your office.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
  },
  "FNaF 2": {
    url: "https://fnafgame.io/fnaf-2.embed?ez_iframe=1",
    id: "fnaf2",
    type: "OpenInGL",
    desc: `Five Nights at Freddy's 2 throws you into a new and improved pizzeria with a new cast of animatronics and no doors for protection. To survive, you must use an empty Freddy Fazbear head to fool the animatronics, a flashlight to fend off others, and keep a music box wound up to prevent a deadly puppet from coming after you.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
  },
  "FNaF 3": {
    url: "https://fnafgame.io/fnaf-3.embed?ez_iframe=1",
    id: "fnaf3",
    type: "OpenInGL",
    desc: `Five Nights at Freddy's 3 is set 30 years later in a horror attraction called Fazbear's Fright. There's only one real animatronic that can kill you, the terrifying Springtrap. You have to monitor his movements on the cameras and use audio cues to lure him away, all while dealing with phantom animatronics that can jumpscare you and cause system failures.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
  },
  "FNaF 4": {
    url: "https://fnafgame.io/fnaf-4.embed?ez_iframe=1",
    id: "fnaf4",
    type: "OpenInGL",
    desc: `Five Nights at Freddy's 4 takes the horror to a child's bedroom. Instead of cameras, you have to rely on your ears. You must listen for breathing and run to the doors, closet, and check the bed to keep nightmarish versions of the animatronics at bay with only a flashlight. It’s a much more direct and terrifying experience.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
  },
  "FNaF World": {
    url: "https://turbowarp.org/96095372/embed?autoplay&addons=remove-curved-stage-border%2Cpause%2Cgamepad",
    id: "fnafworld",
    type: "OpenInGL",
    desc: `FNaF World is a surprising twist on the series, trading horror for a bright and colorful RPG adventure. You create a party from a huge roster of characters from the FNaF universe and explore a whimsical overworld, battling enemies in classic turn-based combat to save the world from a mysterious threat.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
  },
  "Highway Traffic": {
    url: "https://app-97317.games.s3.yandex.net/97317/zr27uqx4qauq31fg2ud41a7oye9c4dki/index.html?sdk=%2Fsdk%2F_%2Fv2.6cafcb80ad19287b13a2.js#origin=https%3A%2F%2Fplayhop.com&app-id=97317&device-type=desktop",
    id: "hwtraffic",
    type: "OpenInGL",
    desc: `Highway Traffic is an endless driving game where you get behind the wheel of a car on a busy multi-lane highway. The goal is to drive as fast and as far as you can without crashing into the other vehicles. You'll need to weave through traffic, earn points for close calls, and try to set a new high score.`,
    working: true,
    status: "Working",
    vdate: "9/17/25",
    //*verified 9/17/25: status=Working
  },
  //?---
  //? GAME VERIFY CHECKPOINT
  //? 9/17/25
  //?---
  "Fractal Combat X": {
    url: "https://play.gamepix.com/fractal-combat-x/embed?sid=e4515",
    id: "fcx",
    type: "OpenInGL",
    desc: `Fractal Combat X is a fast-paced, action-packed flight combat game. You pilot a futuristic fighter jet through stunning, abstract landscapes, battling enemy ships and gigantic bosses. The game is all about intense dogfights, customizing your ship, and upgrading your weapons to survive increasingly challenging missions.`,
    working: true,
    status: "Working",
    vdate: "9/18/25",
    //*verified 9/18/25: status=Working
  },
  "Snow Rider 3D": {
    url: "https://html5.gamedistribution.com/3b79a8537ebc414fb4f9672a9b8c68c8/?gd_sdk_referrer_url=https://gamedistribution.com/games/snow-rider-3d/",
    id: "sr3d",
    type: "OpenInGL",
    desc: `Snow Rider 3D is an endless runner where you hop on a sleigh and race down a massive, snowy mountain. You have to dodge snowmen, trees, and other obstacles while collecting gifts. The further you go, the faster it gets, making it a thrilling test of your reflexes.`,
    working: true,
    status: "Working",
    vdate: "9/18/25",
    //*verified 9/18/25: status=Working
  },
  "The Last Man": {
    url: "https://html5.gamedistribution.com/63c7be58e25e4b37bef7e01d3fa20894/?gd_sdk_referrer_url=https://kevin.games/the-last-man",
    id: "tlm",
    type: "OpenInGL",
    desc: `The Last Man is a 2D battle royale game with a top-down perspective. You're dropped onto a shrinking battlefield with other players, and you have to scavenge for weapons and supplies to be the last one standing. It's a simple, yet intense and action-packed survival game.`,
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Half Life": {
    url: "https://pixelsuft.github.io/hl/xash.html#150",
    id: "hl",
    type: "OpenInGL",
    desc: `In the groundbreaking first-person shooter, Half-Life, you play as Gordon Freeman, a theoretical physicist who finds himself in the middle of a dimensional rift that has unleashed alien creatures throughout the Black Mesa Research Facility. You must fight your way to the surface, battling both aliens and a military cleanup crew, in a desperate attempt to survive and close the portal.`,
    working: true,
    status: "Working",
    vdate: "9/18/25",
    //*verified 9/18/25: status=Working
  },
  "Mario 64": {
    url: "https://static.arcadespot.com/retroemulator.php?system=n64&game=2017/06/super-mario-64.zip",
    id: "m64",
    type: "OpenInGL",
    desc: `Super Mario 64 is a revolutionary 3D platformer that lets you explore the vast and magical world inside Princess Peach's castle. You'll run, jump, and triple-jump your way through massive, open-ended worlds, collecting Power Stars to unlock new areas and ultimately rescue Princess Peach from the clutches of Bowser.`,
    working: false,
    status: "Not Working; Nothing is loaded",
    vdate: "9/18/25",
    //!verified 9/18/25: status=Not Working; Nothing is loaded
  },
  "Among Us": {
    url: "https://amongusio.io/among-us.embed",
    id: "amongus",
    type: "OpenInGL",
    desc: `Among Us is a multiplayer game of teamwork and betrayal. You and a group of other players are crewmates on a spaceship, trying to complete tasks and get your ship ready for departure. But there's an imposter among you, whose goal is to sabotage the ship and eliminate the crew without being discovered. It's up to the crew to figure out who the imposter is and vote them off before it's too late.`,
    working: false,
    status: "Not Working; Refused to connect",
    vdate: "9/18/25",
    //!verified 9/18/25: status=Not Working; Refused to connect
  },
  "Pizza Tower": {
    url: "https://kdata1.com/2021/03/3527391/2.1/",
    id: "pizzatower",
    type: "OpenInGL",
    desc: `Pizza Tower is a fast-paced, 2D platformer with a wild, cartoonish art style. You play as Peppino Spaghetti, a pizza chef on a mission to save his restaurant from the evil Pizza Tower. The game is all about high-speed, combo-driven action as you run, jump, and smash your way through bizarre and chaotic levels.`,
    working: true,
    status: "Working",
    vdate: "9/18/25",
    //*verified 9/18/25: status=Working
  },
  "Riddle School": {
    url: "/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/riddleschool.swf",
    id: "riddleschool1",
    type: "OpenInGL",
    desc: `In Riddle School, you play as a bored student named Phil who wants to escape his boring classroom. To do that, you'll have to solve a series of clever and humorous point-and-click puzzles, interacting with objects and characters in the classroom to find a way out.`,
    customBannerCSS:{"backgroundPositionY": "top",},
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Riddle School 2": {
    url: "/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/riddleschool2.swf",
    id: "riddleschool2",
    type: "OpenInGL",
    desc: `Riddle School 2 continues Phil's adventures as he once again tries to escape from school. This time, the puzzles are even more elaborate, and you'll need to explore more of the school to find the items and clues you need to make your getaway. It's another fun and quirky point-and-click adventure.`,
    customBannerCSS:{"backgroundPositionY": "top",},
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  //?---
  //? GAME VERIFY CHECKPOINT
  //?   + description update
  //? 9/18/25
  //?---
  "Riddle School 3": {
    url: "/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/riddleschool3.swf",
    id: "riddleschool3",
    type: "OpenInGL",
    desc: `In Riddle School 3, Phil's escape attempts land him in a class for gifted students. The puzzles are tougher and the teacher is stricter, but Phil is more determined than ever to find a way out of the school. It's another classic point-and-click adventure with a new set of challenges.`,
    customBannerCSS:{"backgroundPositionY": "top",},
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Riddle School 4": {
    url: "/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/riddleschool4.swf",
    id: "riddleschool4",
    type: "OpenInGL",
    desc: `Riddle School 4 takes place right after Phil escapes the gifted classroom. He finds himself in a deserted school during a snow day, but the exits are all blocked. He must explore the empty halls and solve a new batch of riddles to finally get home.`,
    customBannerCSS:{"backgroundPositionY": "top",},
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Riddle School 5": {
    url: "/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/riddleschool5.swf",
    id: "riddleschool5",
    type: "OpenInGL",
    desc: `The grand finale of the school saga! In Riddle School 5, Phil and his friends have been abducted by aliens. Now, he must use his expert puzzle-solving skills to navigate a mysterious spaceship, outsmart his alien captors, and find a way to save everyone.`,
    customBannerCSS:{"backgroundPositionY": "top",},
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Riddle Transfer": {  
    url: "/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/riddletransfer.swf",
    id: "riddleschool6",
    type: "OpenInGL",
    desc: `The story continues after Riddle School 5. Phil has escaped the aliens, but he's not alone. He's been "transferred" along with an alien cohort named Viz. This new adventure requires Phil to figure out how to handle his new companion and the strange new location he's ended up in.`,
    customBannerCSS:{"backgroundPositionY": "top",},
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Riddle Transfer 2": {
    url: "/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/riddletransfer2.swf",
    id: "riddleschool7",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "top",},
    desc: `The epic conclusion to the entire Riddle School saga! In Riddle Transfer 2, Phil and his friends must team up to stop the alien Viz's evil plans once and for all. This final, feature-length point-and-click adventure involves time travel and wraps up all the loose ends from the series.`,
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Granny": {
    url: "https://gnhustgames.org/granny-source/",
    id: "granny",
    type: "OpenInGL",
    desc: ``,
    working: true,
    status: "Working",
    vdate: "9/25/25",
    //*verified 9/26/25: status=Working
  },
  "Suika Game": {
    url: "https://suikagame.com",
    id: "suika",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "top",},
    desc: ``,
    working: true,
    status: "Working",
    vdate: "9/25/25",
    //*verified 9/26/25: status=Working
  },
  "Tetris": {
    url: "https://www.lumpty.com/amusements/Games/Tetris/tetris.html",
    id: "tetris",
    type: "OpenInGL",
    desc: ``,
    working: true,
    status: "Working",
    vdate: "9/25/25",
    //*verified 9/26/25: status=Working
  },
  "Snake": {
    url: "https://patorjk.com/games/snake/",
    id: "snake",
    type: "OpenInGL",
    desc: ``,
    working: true,
    status: "Working",
    vdate: "9/25/25",
    //*verified 9/26/25: status=Working
  },
  "Super Smash Flash": {
    url: "/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/SuperSmash.swf",
    id: "ssf",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "top",},
    desc: ``,
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Super Smash Flash 2": {
    url: "/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/SuperSmash2.swf",
    id: "ssf2",
    type: "OpenInGL",
    desc: ``,
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Super Mario 63": {
    url: "/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/supermario63.swf",
    id: "sm63",
    type: "OpenInGL",
    desc: ``,
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Happy Wheels": {
    url: `/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/happyWheels.swf${false?(queryParams.lb==="true"?"&lb=true":""):""}`,
    id: "hw",
    type: "OpenInGL",
    desc: ``,
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "FPA World 1": {
    url: `/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/FPAWorld1.swf${false?(queryParams.lb==="true"?"&lb=true":""):""}`,
    id: "fpaw1",
    type: "OpenInGL",
    desc: ``,
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "FPA World 2": {
    url: `/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/FPAWorld2.swf${false?(queryParams.lb==="true"?"&lb=true":""):""}`,
    id: "fpaw2",
    type: "OpenInGL",
    desc: ``,
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "FPA World 3": {
    url: `/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/FPAWorld3.swf${false?(queryParams.lb==="true"?"&lb=true":""):""}`,
    id: "fpaw3",
    type: "OpenInGL",
    desc: ``,
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Duck Life": {
    url: `/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/ducklife.swf${false?(queryParams.lb==="true"?"&lb=true":""):""}`,
    id: "dl1",
    type: "OpenInGL",
    desc: ``,
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Duck Life 2": {
    url: `/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/ducklife2.swf${false?(queryParams.lb==="true"?"&lb=true":""):""}`,
    id: "dl2",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "25%",},
    desc: ``,
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Duck Life 3": {
    url: `/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/ducklife3.swf${false?(queryParams.lb==="true"?"&lb=true":""):""}`,
    id: "dl3",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "top",},
    desc: ``,
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Duck Life 4": {
    url: `/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/ducklife4.swf${false?(queryParams.lb==="true"?"&lb=true":""):""}`,
    id: "dl4",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "top",},
    desc: ``,
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Penalty Shooters 2": {
    url: "https://html5.gamedistribution.com/571b9df027e449f78e3869ba19658754/?gd_sdk_referrer_url=https://gamedistribution.com/games/Penalty-Shooters-2/",
    id: "ps2",
    type: "OpenInGL",
    desc: ``,
    working: true,
    status: "Working",
    vdate: "9/25/25",
    //*verified 9/26/25: status=Working
  },
  "Pokemon Gold": {
    url: "https://static.arcadespot.com/retroemulator.php?system=gbc&game=2016/07/pokemon-gold.zip",
    id: "pokegold",
    type: "OpenInGL",
    desc: ``,
    working: false,
    status: "Not Working; Never loads",
    vdate: "9/25/25",
    //!verified 9/26/25: status=Not Working; Never loads
  },
  "Breaking the Bank": {
    url: `/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/breakingthebank.swf${false?(queryParams.lb==="true"?"&lb=true":""):""}`,
    id: "hsbtb",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "top",},
    desc: ``,
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Escaping the Prison": {
    url: `/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/escapingtheprisongame.swf${false?(queryParams.lb==="true"?"&lb=true":""):""}`,
    id: "hsetp",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "top",},
    desc: ``,
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Crossing the Pit": {
    url: `/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/flash_crossingthepit.swf${false?(queryParams.lb==="true"?"&lb=true":""):""}`,
    id: "hsctp",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "top",},
    desc: ``,
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Fleeing the Complex": {
    url: `/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/fleeing_the_complex.swf${false?(queryParams.lb==="true"?"&lb=true":""):""}`,
    id: "hsftc",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "top",},
    desc: ``,
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Infiltrating The Airship": {
    url: `/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/infiltratingtheairshipgame.swf${false?(queryParams.lb==="true"?"&lb=true":""):""}`,
    id: "hsita",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "top",},
    desc: ``,
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Stealing the Diamond": {
    url: `/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/stealingthediamondgame.swf${false?(queryParams.lb==="true"?"&lb=true":""):""}`,
    id: "hsstd",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "top",},
    desc: ``,
    working: true,
    status: "Working; Fixed",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working; Fixed
    //!verified 9/18/25: status=Not Working; Infinite Loading
  },
  "Cluster Trucks": {
    url: `https://clusterrush.io/game/cluster-rush/`,
    id: "clustert",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "top",},
    desc: ``,
    working: true,
    status: "Working",
    vdate: "9/25/25",
    //*verified 9/26/25: status=Working
  },
  "Tank Trouble": {
    url: `https://tanktrouble.com`,
    id: "tanktrouble",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "top",},
    desc: ``,
    working: true,
    status: "Working",
    vdate: "9/25/25",
    //*verified 9/26/25: status=Working
  },
  "Coreball": {
    url: `https://www.arealme.com/coreball/en/`,
    id: "coreball",
    type: "OpenInGL",
    desc: ``,
    working: true,
    status: "Working",
    vdate: "9/25/25",
    //*verified 9/26/25: status=Working
  },
  "Block Blast": {
    url: `https://blockblastonline.com/game/block-blast-v1/`,
    id: "blockblast",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "85%",},
    desc: ``,
    working: false,
    status: "Not Working; Not found error",
    vdate: "9/25/25",
    //!verified 9/26/25: status=Not Working; Not found error
  },
  "Big Shot Boxing": {
    url: `https://g2.igroutka.ru/games/164/3EPlpaMwGYF4D9A2/2/big_shot_boxing/`,
    id: "bigshotboxing",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "top",},
    desc: ``,
    working: true,
    status: "Working",
    vdate: "9/25/25",
    //*verified 9/26/25: status=Working
  },
  //? ---
  //? GAME VERIFY CHECKPOINT
  //*   + verify (25)
  //*   ? game bugfix 1 (26)
  //>   + format update 1 (26)
  //? 9/25-26/25
  //? --- 
  "Basketball Random": {
    url: `https://games.crazygames.com/en_US/basket-random/index.html?v=1.311`,
    id: "bbrand",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "top",},
    working: false,
    status: "Not Working; CrazyGames is Net Blocked",
    vdate: "9/26/25",
    //!verified 9/26/25: status=Not Working; CrazyGames is Net Blocked
  },
  "Mario Crossover": {
    url: `/gs/emulator_src/ruffle/ruffleLoader.html?g=/gs/emulator_src/ruffle/games/stealingthediamondgame.swf${false?(queryParams.lb==="true"?"&lb=true":""):""}`,
    id: "smbco",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "top",},
    working: true,
    status: "Working",
    vdate: "9/26/25",
    //*verified 9/26/25: status=Working
  },
  "Getaway Shootout": {
    url: `https://shootout.vercel.app/`,
    id: "gtawyshtout",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "bottom",},
    working: false,
    status: "Not Working; Never loads",
    vdate: "9/26/25",
    //!verified 9/26/25: status=Not Working; Never loads
  },
  "Rally Racer Dirt": {
    url: `https://games.crazygames.com/en_US/rally-racer-dirt/index.html?v=1.327`,
    id: "rrd",
    type: "OpenInGL",
    customBannerCSS:{"backgroundPositionY": "bottom",},
    working: false,
    status: "Not Working; CrazyGames is Net Blocked",
    vdate: "9/26/25",
    //!verified 9/26/25: status=Not Working; CrazyGames is Net Blocked
  },
  //? ---
  //? GAME VERIFY CHECKPOINT
  //*   + COMPLETED current list as of 9/26/25
  //? 9/26/25
  //? ---
  // "Melon Sandbox": {
    // url: "https://yandex.com/games/app/260481?header=no&skip-guard=1&utm_source=distrib&utm_medium=gamepix",
    // id: "melon",
    // type: "OpenInGL"
  // },
};
//? add '&lb=true' to enable letterbox on ruffle urls
export default games;