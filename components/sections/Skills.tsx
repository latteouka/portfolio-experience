import { useNavbarStore } from "@/store/navbarStore";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Title from "../parts/Title";
import { Sub } from "./Parts";
import { MousePointer } from "@/gl/core/mousePointer";
import { gsap } from "gsap";
import { TexLoader } from "@/gl/webgl/texLoader";
import { Param } from "@/gl/core/param";
import { Func } from "@/gl/core/func";

const skills = [
  { name: "Javascript", path: "/icons/js.png" },
  { name: "Node.js", path: "/icons/node.png" },
  { name: "React.js", path: "/icons/react.png" },
  { name: "Next.js", path: "/icons/next.png" },
  { name: "Typescript", path: "/icons/ts.png" },
  { name: "GSAP", path: "/icons/gsap.png" },
  { name: "WebGL", path: "/icons/webgl.png" },
  { name: "Shaders", path: "/icons/shader.png" },
  { name: "Three.js", path: "/icons/three.png" },
  { name: "React Three Fiber", path: "/icons/r3f.png" },
  { name: "Blender", path: "/icons/blender.png" },
];

const Skills = () => {
  const { setActive } = useNavbarStore();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const wrap = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) {
      setActive("SKILLS");
    }
  }, [inView, setActive]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      wrap.current?.addEventListener("pointermove", () => {
        const rect = wrap.current?.getBoundingClientRect()!;
        gsap.to(image.current, {
          x: MousePointer.instance.x - rect.left,
          y: MousePointer.instance.y - rect.top,
          duration: 1,
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <div className="skills-wrap" ref={ref}>
      <div className="grid-layout">
        <div className="skills-content" ref={wrap}>
          <Title title="SKILLS" />
          <Sub>Learning is part of my life</Sub>
          <div className="skills-content-wrap">
            {skills.map((skill, index) => {
              return (
                <Box key={index} path={skill.path ? skill.path : ""}>
                  {skill.name}
                </Box>
              );
            })}
          </div>
          <div className="skills-content-image" ref={image}></div>
        </div>
      </div>
    </div>
  );
};
export default Skills;

interface BoxProps {
  children: React.ReactNode;
  path: string;
}
const Box = ({ children, path }: BoxProps) => {
  const container = useRef<HTMLDivElement>(null);
  const blurRect = useRef<SVGRectElement>(null);
  const lineRect = useRef<SVGRectElement>(null);

  useEffect(() => {
    const rx = getComputedStyle(container.current!).borderRadius;
    blurRect.current?.setAttribute("rx", rx);
    lineRect.current?.setAttribute("rx", rx);
  }, []);

  function over() {
    const t = TexLoader.instance.get(path);
    Param.instance.main.texture.value = t;
    gsap.to(Param.instance.main.skillAlpha, {
      value: 1,
      duration: 1,
    });
  }

  function leave() {
    gsap.to(Param.instance.main.skillAlpha, {
      value: Func.instance.sw() > 800 ? 0 : 1,
      duration: 1,
    });
  }

  return (
    <div
      className="skills-box"
      ref={container}
      onPointerOver={over}
      onPointerLeave={leave}
    >
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
