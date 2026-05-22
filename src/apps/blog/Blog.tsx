import { motion } from "motion/react";
import "./style.scss";
import { generateId } from "../../sdk/Lib";
import { Tabs } from "@base-ui/react";
import type { CSSProperties, ReactElement } from "react";
import { Posts } from "./Posts";
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
                            style={{
                                backgroundImage:`
                                    linear-gradient(to left,#151515aa,#20202090),
                                    url("${data.headerbg}")`,
                                ...data.customHeaderBgStyle
                            }}
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
                                    style={{
                                        backgroundImage:`url("${data.headerbg}")`,
                                        ...data.customHeaderBgStyle}}
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