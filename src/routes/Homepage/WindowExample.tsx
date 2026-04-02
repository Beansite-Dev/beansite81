import type { CSSProperties, ReactElement, ReactNode } from "react";
import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { Icons, WindowSymbols } from "../../sdk/components/Enum";
import "./styles/Window.scss";

export const FunctionlessWindow=({
  title,
  icon = Icons.configApplication,
  children,
  winContentStyle={},
  ...rest
}: {
  title: string;
  icon?: string;
  children?: ReactNode;
  winContentStyle?:CSSProperties;
} & HTMLMotionProps<"div">): ReactElement => {
  return (
    <motion.div className="Window" {...rest}>
      <motion.div className="WindowDragHandle">
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
      <motion.div className="WinContents" style={winContentStyle}>
        {children}
      </motion.div>
    </motion.div>
  );
};
