import { useNavbarStore } from "@/store/navbarStore";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Title from "../parts/Title";
import { Sub } from "./Parts";

const Skills = () => {
  const { setActive } = useNavbarStore();
  const { ref, inView } = useInView({ threshold: 0.4 });
  useEffect(() => {
    if (inView) {
      setActive("SKILLS");
    }
  }, [inView, setActive]);
  return (
    <div className="skills-wrap" ref={ref}>
      <div className="grid-layout">
        <div className="skills-content">
          <Title title="SKILLS" />
          <Sub>What I am familiar with</Sub>
          <div className="skills-content-wrap">
            <Box>Javascript</Box>
            <Box>Node.js</Box>
            <Box>React.js / Next.js</Box>
            <Box>Typescript</Box>
            <Box>GSAP</Box>
            <Box>WebGL</Box>
            <Box>Shaders</Box>
            <Box>Three.js</Box>
            <Box>React Three Fiber</Box>
            <Box>Blender</Box>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Skills;

interface BoxProps {
  children: React.ReactNode;
}
const Box = ({ children }: BoxProps) => {
  const container = useRef<HTMLDivElement>(null);
  const blurRect = useRef<SVGRectElement>(null);
  const lineRect = useRef<SVGRectElement>(null);
  useEffect(() => {
    const rx = getComputedStyle(container.current!).borderRadius;
    blurRect.current?.setAttribute("rx", rx);
    lineRect.current?.setAttribute("rx", rx);
  }, []);
  return (
    <div className="skills-box" ref={container}>
      {children}
      <svg className="glow-container">
        <rect
          pathLength="100"
          strokeLinecap="round"
          className="glow-blur"
          ref={blurRect}
        ></rect>
        <rect
          pathLength="100"
          strokeLinecap="round"
          className="glow-line"
          ref={lineRect}
        ></rect>
      </svg>
    </div>
  );
};
