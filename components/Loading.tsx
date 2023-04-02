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
    gsap.to(ref.current, {
      opacity: 0,
      duration: 1.4,
    });
  }, [imagesPreloaded]);
  return <div className="loading" ref={ref}></div>;
};
export default Loading;
