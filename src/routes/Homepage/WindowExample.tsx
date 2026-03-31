import type { ReactElement, ReactNode } from "react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { Icons, WindowSymbols } from "../../sdk/components/Enum";
import "./styles/Window.scss";

export const FunctionlessWindow=({
  title,
  icon = Icons.configApplication,
  children,
  ...rest
}: {
  title: string;
  icon?: string;
  children?: ReactNode;
} & HTMLMotionProps<"div">): ReactElement => {
  return (
    <motion.div className="Window" {...rest} style={{ position: "absolute", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(15,15,15,0.85)", backdropFilter: "blur(2rem)", ...(rest.style as object || {}) }}>
      <motion.div className="WindowDragHandle" style={{ cursor: "default" }}>
        <motion.div
          className="Icon"
          style={{backgroundImage:`url(${icon})`,}}></motion.div>
        <motion.h1 className="Title">{title}</motion.h1>
        <motion.div className="ButtonWrapper">
          <motion.button className="Button x">{WindowSymbols.close}</motion.button>
          <motion.button className="Button max">{WindowSymbols.max}</motion.button>
          <motion.button className="Button min">{WindowSymbols.min}</motion.button>
        </motion.div>
      </motion.div>
      <motion.div className="WinContents">
        {children}
      </motion.div>
    </motion.div>
  );
};
