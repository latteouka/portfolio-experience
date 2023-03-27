import { useEffect } from "react";
// @ts-ignore
import SplitTextJS from "split-text-js";
import { gsap } from "gsap";

const useUkabu = (selector: string) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray(selector);
      targets.forEach((target: any) => {
        const splitText = new SplitTextJS(target);
        gsap.fromTo(
          splitText.chars,
          { y: "100%" },
          {
            y: 0,
            stagger: {
              each: 0.02,
              ease: "random(power2, none)",
            },
            scrollTrigger: {
              trigger: target,
              start: "bottom bottom",
            },
          }
        );
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);
};
export default useUkabu;
