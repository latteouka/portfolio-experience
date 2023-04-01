import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { useLenisStore } from "@/store/lenisStore";
import { Param } from "@/gl/core/param";
import { Update } from "@/gl/libs/update";
import { HeroBottom } from "@/gl/parts/hero-bottom";
import { SkillBack } from "@/gl/parts/skillBack";

const useLenis = () => {
  const { setLenis } = useLenisStore();
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    lenis.current = new Lenis({
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      // smoothTouch: true,
    });

    setLenis(lenis.current);

    function raf(time: number) {
      lenis.current?.raf(time);
    }

    Update.instance.addFirst(raf);

    lenis.current.on("scroll", ({ scroll }: any) => {
      const hero = Param.instance.main.hero.value as HeroBottom;
      const skillBack = Param.instance.main.skillBack.value as SkillBack;
      hero.position.y = hero.oriY + scroll;
      skillBack.position.y = skillBack.oriY + scroll;
    });

    Param.instance.main.scroll.value = lenis.current;

    return () => {
      Update.instance.remove(raf);
      lenis.current?.destroy();
      lenis.current = null;
    };
  }, []);

  return lenis.current;
};
export default useLenis;
