import { useEffect, useRef } from "react";
import useImagePreloader from "../utils/useImagePreloader";
import { useLenisStore } from "@/store/lenisStore";
import { gsap } from "gsap";

const imageList = [
  "/icons/js.png",
  "/icons/ts.png",
  "/icons/next.png",
  "/icons/node.png",
  "/icons/gsap.png",
  "/icons/blender.png",
  "/icons/react.png",
  "/icons/shader.png",
  "/icons/three.png",
  "/icons/webgl.png",
  "/icons/python.png",
  "/icons/r3f.png",
];

const Loading = () => {
  const { lenis } = useLenisStore();
  const { imagesPreloaded } = useImagePreloader(imageList);
  const ref = useRef(null);

  useEffect(() => {
    lenis?.stop();
    if (!imagesPreloaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(ref.current, {
        opacity: 0,
        duration: 1,
      });
      tl.fromTo(
        document.querySelector(".nav-title-about"),
        { y: 100 },
        {
          y: 0,
          duration: 0.7,
          onComplete: () => {
            lenis?.start();
          },
        },
        "<0.1"
      );
    });

    return () => {
      ctx.revert();
    };
  }, [imagesPreloaded]);
  return <div className="loading" ref={ref}></div>;
};
export default Loading;
