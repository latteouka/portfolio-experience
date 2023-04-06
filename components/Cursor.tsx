import { gsap } from "gsap";
import { useEffect, useMemo, useRef } from "react";

function getCursorPos(event: MouseEvent) {
  return {
    x: event.clientX,
    y: event.clientY,
  };
}

const Cursor = () => {
  const cursor1 = useRef<SVGSVGElement>(null);
  const cursor2 = useRef<SVGSVGElement>(null);
  const inner1 = useRef<SVGCircleElement>(null);
  const inner2 = useRef<SVGCircleElement>(null);
  const turbulence = useRef<SVGFETurbulenceElement>(null);

  let cursorPos = useMemo(() => {
    return { x: 0, y: 0 };
  }, []);

  let bound = useMemo<number>(() => {
    return 0;
  }, []);

  let tl = useRef<gsap.core.Timeline>();
  let turbulenceValue = useRef({ turbulence: 0 });

  function enter() {
    gsap.to(inner1.current, {
      r: 30,
    });
    gsap.to(inner2.current, {
      r: 30,
    });
    tl.current?.restart();
  }
  function leave() {
    gsap.to(inner1.current, {
      r: 18,
    });
    gsap.to(inner2.current, {
      r: 20,
    });
    tl.current?.progress(1).kill();
  }

  // animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // move cursor
      function move(event: MouseEvent) {
        cursorPos = getCursorPos(event);
        gsap.to(cursor1.current, {
          x: cursorPos.x - bound / 2,
          y: cursorPos.y - bound / 2,
          duration: 0.4,
        });
        gsap.to(cursor2.current, {
          x: cursorPos.x - bound / 2,
          y: cursorPos.y - bound / 2,
          duration: 0.4,
          ease: "expo",
        });
      }
      window.addEventListener("mousemove", move);

      // create a timeline for turbulence animation
      tl.current = gsap
        .timeline({
          paused: true,
          onStart: () => {
            inner1.current!.style.filter = `url(#cursor-filter)`;
            inner2.current!.style.filter = `url(#cursor-filter)`;
          },
          onUpdate: () => {
            turbulence.current!.setAttribute(
              "baseFrequency",
              turbulenceValue.current!.turbulence.toString()
            );
          },
          onComplete: () => {
            inner1.current!.style.filter = "none";
            inner2.current!.style.filter = "none";
          },
        })
        .to(turbulenceValue.current, {
          turbulence: 0,
          duration: 0.6,
          startAt: { turbulence: 10 },
        });

      // trigger events
      let actives = document.querySelectorAll("a");
      actives.forEach((active) => {
        active.addEventListener("mouseenter", enter);
        active.addEventListener("mouseleave", leave);
      });
      actives = document.querySelectorAll(".nav-title");
      actives.forEach((active) => {
        active.addEventListener("mouseenter", enter);
        active.addEventListener("mouseleave", leave);
      });
      actives = document.querySelectorAll(".nav-logo");
      actives.forEach((active) => {
        active.addEventListener("mouseenter", enter);
        active.addEventListener("mouseleave", leave);
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  // bind event
  useEffect(() => {
    bound = cursor1.current!.getBoundingClientRect().width;
  }, []);
  return (
    <>
      <svg
        className="cursor"
        width="120"
        height="120"
        viewBox="0 0 120 120"
        ref={cursor1}
      >
        <defs>
          <filter
            id="cursor-filter"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0"
              numOctaves="1"
              result="warp"
              ref={turbulence}
            />
            <feDisplacementMap
              xChannelSelector="R"
              yChannelSelector="G"
              scale="30"
              in="SourceGraphic"
            />
          </filter>
        </defs>
        <circle className="cursor__inner" cx="60" cy="60" r="18" ref={inner1} />
      </svg>
      <svg
        className="cursor"
        width="120"
        height="120"
        viewBox="0 0 120 120"
        data-amt="0.1"
        ref={cursor2}
      >
        <circle className="cursor__inner" cx="60" cy="60" r="20" ref={inner2} />
      </svg>
    </>
  );
};
export default Cursor;
