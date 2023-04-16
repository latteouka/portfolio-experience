import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { Param } from "@/gl/core/param";
import { HeroBottom } from "@/gl/parts/hero-bottom";
import { SkillBack } from "@/gl/parts/skillBack";

const useLenis = () => {
  const reqIdRef = useRef<ReturnType<typeof requestAnimationFrame>>();

  useEffect(() => {
    const lenis = new Lenis({
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      // smoothTouch: true,
    });

    // lenis raf
    const animate = (time: DOMHighResTimeStamp) => {
      lenis.raf(time);
      reqIdRef.current = requestAnimationFrame(animate);
    };
    reqIdRef.current = requestAnimationFrame(animate);

    lenis.on("scroll", ({ scroll }: any) => {
      const hero = Param.instance.main.hero.value as HeroBottom;
      const skillBack = Param.instance.main.skillBack.value as SkillBack;
      hero.position.y = hero.oriY + scroll;
      skillBack.position.y = skillBack.oriY + scroll;
    });

    Param.instance.main.scroll.value = lenis;

    return () => {
      lenis.destroy();
      cancelAnimationFrame(reqIdRef.current as number);
    };
  }, []);
};
export default useLenis;
