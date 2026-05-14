import { motion } from "motion/react";
import "./style.scss";
import { generateId } from "../../sdk/Lib";
import { Tabs } from "@base-ui/react";
import type { CSSProperties, ReactElement } from "react";
const Posts:{
    title:string;
    id:string;
    pinned:boolean;
    uuid:string;
    author:string;
    date:string;
    headerbg:string;
    customHeaderStyle?:CSSProperties;
    content:ReactElement|ReactElement[];
}[]=[
    {
        title: "pkSmp Partnership",
        id: "pksmp",
        pinned: false,
        customHeaderStyle:{lineHeight:1.5},
        uuid: generateId(10),
        author: "Tyler & Nick",
        date: "5/13/2026",
        headerbg: "/apps/beanforged/pk.png",
        content:<>

        </>,
    },{
        title: "First Entry",
        id: "init",
        pinned: true,
        uuid: generateId(10),
        author: "Tyler",
        date: "5/13/2026",
        headerbg: "/wallpaper/seeds.png",
        content:<>
            <h1>Hello Again (again)</h1>
            <p>
                I'm proud to see how far beansite has come, 
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
const Blog=({})=>{
    return(<>
        <motion.div id="BlogWrapper">
            <Tabs.Root 
                className="BlogTabRoot" 
                defaultValue={Posts.filter(itm=>itm.pinned)[0].uuid} 
                onValueChange={(e)=>console.log(e)}>
                    <Tabs.List className="BlogList">
                        {/* <Tabs.Tab className="BlogTab" value="overview">
                            Overview
                        </Tabs.Tab> */}
                        {Posts.map(data=><Tabs.Tab
                            className="BlogTab" 
                            value={data.uuid}
                            style={{backgroundImage:`
                                linear-gradient(to left,#151515aa,#20202090),
                                url("${data.headerbg}")
                            `}}
                            key={data.uuid}>
                                {data.title}
                                {/* <span className="bgspan" ></span> */}
                            </Tabs.Tab>)}
                        <Tabs.Indicator className="BlogIndicator" />
                    </Tabs.List>
                    {/* <Tabs.Panel className="BlogPanel" value="overview">
                        <h1>Overview</h1>
                    </Tabs.Panel> */}
                    {Posts.map(data=><Tabs.Panel
                        className="BlogPanel" 
                        value={data.uuid}
                        key={data.uuid}>
                            <motion.div className="BlogHeader">
                                <motion.h1 style={data.customHeaderStyle}>{data.title}</motion.h1>
                                {/* <hr/> */}
                                <motion.div className="RowWrap">
                                    <motion.span className="bauth">{data.author}</motion.span>
                                    <motion.span className="bullet">•</motion.span>
                                    <motion.span className="bdate">{data.date}</motion.span>
                                </motion.div>
                                <motion.div 
                                    style={{backgroundImage:`url("${data.headerbg}")`}}
                                    className="BlogHBG"></motion.div>
                            </motion.div>
                            {data.content}
                            <br/>
                            <span className="RowWrap">
                                <span style={{
                                    fontSize:".875rem",
                                    color:"#656565",
                                    width: "100%",
                                    textAlign:"center"}}>M1dnight © 2026 | All rights resverved</span>
                            </span>
                    </Tabs.Panel>)}
            </Tabs.Root>
        </motion.div>
    </>);
};
export default Blog;