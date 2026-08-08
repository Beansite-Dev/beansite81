import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { lazy, useRef, type ReactElement, useEffect } from "react";
// import { FunctionlessWindow } from "../WindowExample";
import { Icons } from "../../../sdk/components/Enum";
import Beanpowered from "../components/BeanpoweredDemo";
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Sky,
  Environment,
  OrbitControls,
  useGLTF,
} from '@react-three/drei';
import * as THREE from "three";
import Beanforged from "../components/BeanforgedDemo.tsx";
const FunctionlessWindow=lazy(()=>import("../WindowExample.tsx"));
const ani={
  initial:{opacity:0,y:15,},
  whileInView:{opacity:1,y:0,},
  viewport:{once:true}
};
const winVariant:Variants={
  hidden:{opacity:0,y:30},
  visible:{
    opacity:1,
    y:0,
    transition:{
      duration:.35
    }
  },
};
const Landscape=({})=>{
  const{scene}=useGLTF('/assets/homepage/minecraft_landscape/scene.gltf');
  const groupRef=useRef<THREE.Group>(null);
  const mouse=useRef({x:0,y:0,});
  useEffect(()=>{
    const handleMouseMove=(event:MouseEvent)=>{
      mouse.current.x=(event.clientX/window.innerWidth)*2-1;
      mouse.current.y=(event.clientY/window.innerHeight)*2-1;
    };
    window.addEventListener("mousemove",handleMouseMove);
    return()=>window.removeEventListener("mousemove",handleMouseMove);
  },[]);
  useFrame(()=>{
    if(!groupRef.current)return;
    const targetRotationY=mouse.current.x*0.15;
    const targetRotationX=mouse.current.y*0.06;
    groupRef.current.rotation.y=THREE.MathUtils.lerp(groupRef.current.rotation.y,targetRotationY,0.04);
    groupRef.current.rotation.x=THREE.MathUtils.lerp(groupRef.current.rotation.x,targetRotationX,0.04);
  });
  return(<group ref={groupRef}>
    <primitive object={scene}/>
  </group>)
}
const S4=():ReactElement=>{
  return(<motion.section className="s4">
    <motion.div className="shade"></motion.div>
    <motion.div className="background">
      <Canvas
        shadows
        camera={{
          position: [-8, 5, 5],
          fov: 30,
          near: 0.1,
          far: 1000,
        }}>
          <Sky
            distance={450000}
            sunPosition={[-15,4,-20]}
            turbidity={10}
            rayleigh={.5}/>
          <ambientLight intensity={.45} color={"#fff6e9"} />
          <ambientLight intensity={.25} color={"#9b66ff"} />
          <directionalLight
            position={[-15,9,-20]}
            intensity={1.5}
            color={"#ffc599"}
            castShadow/>
          <Landscape/>
      </Canvas>
    </motion.div>
    <motion.div className="rowWrapper">
      <motion.div className="left">
        <FunctionlessWindow 
          style={{
            height:"100% !important",
            width:"100% !important",
          }}
          {...ani}
          transition={{duration:.25,delay:.75}}
          winContentStyle={{overflow:"hidden !important",}}
          variants={winVariant}
          icon={Icons.beanforged}
          title="Beanforged">
            <Beanforged/>
        </FunctionlessWindow>
      </motion.div>
      <motion.div className="right">
        <motion.h1 {...ani} transition={{duration:.25,delay:.25}}>Our pkSmp Partnership</motion.h1>
        <motion.p {...ani} transition={{duration:.25,delay:.5}}>
          Beansite has also partnered with pkSmp to deliver a first-class Minecraft experience 
          directly from your browser using our very own custom client. With an alert team focused 
          on keeping our users our number one priority, we're proud to offer one of the best 
          Eaglercraft server and client experiences online. All versions of Minecraft are supported, 
          so don't be afraid to join us from Java or Bedrock at pksmp.net.
        </motion.p>
      </motion.div>
    </motion.div>
  </motion.section>);
};
export default S4;
