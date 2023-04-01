import { gsap } from "gsap";
// @ts-ignore
import SplitTextJS from "split-text-js";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useNavbarStore } from "@/store/navbarStore";

const Hero = () => {
  const { setActive } = useNavbarStore();
  const { ref, inView } = useInView({ threshold: 0.4 });

  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const texts = gsap.utils.toArray(".hero-loop-animate");
      tl.current = gsap.timeline({ repeat: -1 });

      texts.forEach((text) => {
        const splitText = new SplitTextJS(text);

        tl.current
          ?.from(
            splitText.chars,
            {
              opacity: 0,
              y: 60,
              rotateX: -90,
              stagger: 0.02,
            },
            "<"
          )
          .to(
            splitText.chars,
            {
              opacity: 0,
              y: -60,
              rotateX: 90,
              stagger: {
                each: 0.02,
                from: "random",
                //ease: "power2" // distributes the start times
                ease: "random(power2, none)",
              },
            },
            "<3"
          );
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (inView) {
      setActive("ABOUT");
    }
  }, [inView, setActive]);

  return (
    <div className="hero-wrap about-wrap" ref={ref} id="about">
      <div className="hero-content">
        <div className="hero-content_wrap">
          <div className="hero-content_titles">
            <div>Hello</div>
            <div>I&apos;m Yi Chun</div>
            <div>
              Looking for a{" "}
              <span className="hero-loop">
                <span className="hero-loop-animate">Frontend</span>
                <span className="hero-loop-text hero-loop-animate">Webgl</span>
                <span className="hero-loop-text hero-loop-animate">
                  Creative
                </span>
                <span className="hero-loop-text hero-loop-animate">
                  Frontend
                </span>
                <span className="hero-loop-text hero-loop-animate">Webgl</span>
                <span className="hero-loop-text hero-loop-animate">
                  Creative
                </span>
                <span className="hero-loop-text hero-loop-animate">
                  Frontend
                </span>
                <span className="hero-loop-text hero-loop-animate">Webgl</span>
                <span className="hero-loop-text hero-loop-animate">
                  Creative
                </span>
                <span className="hero-loop-text hero-loop-animate">
                  Frontend
                </span>
                <span className="hero-loop-text hero-loop-animate">Webgl</span>
                <span className="hero-loop-text hero-loop-animate">
                  Creative
                </span>
                <span className="hero-loop-text hero-loop-animate">
                  Frontend
                </span>
                <span className="hero-loop-text hero-loop-animate">Webgl</span>
                <span className="hero-loop-text hero-loop-animate">
                  Creative
                </span>
              </span>{" "}
              developer job.
            </div>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <div className="hero-bottom-left"></div>
        <div className="hero-bottom-right">
          <div className="hero-bottom-intro">
            I can speak both English and Japanese. Actually, I learn more from
            Japanese resources regarding WebGL!
          </div>
          <div className="hero-bottom-line"></div>
          <div className="hero-bottom-place">
            <div>Taiwan</div>
            <div>Tsai Yi Chun</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
