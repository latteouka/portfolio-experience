import Title from "../parts/Title";
import { useNavbarStore } from "@/store/navbarStore";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Links from "../parts/Links";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import useUkabu from "@/utils/useUkabu";
import { AnimationWrapper, Sub, Sub2 } from "./Parts";

const Path = () => {
  const { setActive } = useNavbarStore();
  const { ref, inView } = useInView({ threshold: 0.2 });

  useUkabu(".experience-content-subtitle");
  useUkabu(".experience-sub");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animations = gsap.utils.toArray(".animation-wrap");
      animations.forEach((animation: any) => {
        gsap.to(animation, {
          x: "0",
          opacity: 1,
          duration: 0.8,
          ease: "slowmo",
          scrollTrigger: {
            trigger: animation,
            start: "bottom bottom",
          },
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (inView) {
      setActive("EXPERIENCE");
    }
  }, [inView, setActive]);
  return (
    <div className="path-wrap experience-wrap" ref={ref}>
      <div className="grid-layout">
        <div className="experience-content">
          <Title title="EXPERIENCE" />
          <Sub>I love solving problems!</Sub>
          <div className="experience-content-wrap">
            {/* section 1 */}
            <div className="experience-content-subtitle-mask">
              <div className="experience-content-subtitle">刑警時期</div>
            </div>

            <AnimationWrapper>
              <div className="experience-content-project">WordAutoPic</div>
              <Solve>蒐證後大量圖片需要製作表格及編號。</Solve>
              <Tech>
                <Stack stacks={["Python", "python-docx"]} color="blue" />
              </Tech>
              <Links
                link="https://cibtools.chundev.com/tools/autopic"
                github="https://github.com/latteouka/python-wordautopic"
              />
              <Sub2>
                只是個簡單的小工具，但完全改變了我與同事蒐證及製作筆錄的流程。
              </Sub2>
            </AnimationWrapper>

            <AnimationWrapper>
              <div className="experience-content-project">自動定位工具</div>
              <Solve>自動爬蟲點擊並抓取指定資訊寄給指定對象。</Solve>
              <Tech>
                <Stack stacks={["Python", "selenium"]} color="blue" />
              </Tech>
              <Links link="none" github="https://github.com/latteouka/loccib" />
              <Sub2>行動時辦公室不用再放一個人力，使用量非常大的工具。</Sub2>
            </AnimationWrapper>

            <AnimationWrapper>
              <div className="experience-content-project">
                自動定位工具（網頁）
              </div>
              <Solve>
                將上述工具改為向後端傳遞結果，並另外以網頁呈現，讓大家方便查看及匯出歷史紀錄。
              </Solve>
              <Tech>
                <Stack stacks={["Python", "Flask"]} color="blue" />
              </Tech>
              <Links
                link="https://loccib.herokuapp.com/"
                github="https://github.com/latteouka/loccib"
              />
              <Sub2>已隨 Heroku 取消免費走入歷史。</Sub2>
            </AnimationWrapper>

            <AnimationWrapper>
              <div className="experience-content-project">系統資訊回報</div>
              <Solve>
                自動爬蟲點擊下載檔案，排程分析後再以爬蟲於業者網頁查詢代碼，並以
                Line Bot 回傳。
              </Solve>
              <Tech>
                <Stack stacks={["Python", "OCR", "Line-Bot"]} color="blue" />
              </Tech>
            </AnimationWrapper>

            <AnimationWrapper>
              <div className="experience-content-project">Wireshark Helper</div>
              <Solve>讓不懂操作 Wireshark 的同仁也能輕鬆錄取封包。</Solve>
              <Tech>
                <Stack stacks={["Python", "Wireshark"]} color="blue" />
              </Tech>
              <Links
                link="none"
                github="https://github.com/latteouka/wireshark-helper"
              />
            </AnimationWrapper>

            {/* section 2 */}
            <div
              className="experience-content-subtitle"
              style={{ marginTop: "2rem" }}
            >
              離職後
            </div>

            <AnimationWrapper>
              <div className="experience-content-project">CIBtools</div>
              <Solve>
                將過去同仁常使用的 IP 彙整、Excel、文字處理等小工具改用
                Javascript 在網頁上，讓大家能持續使用，我也能因應需求更新。
              </Solve>
              <Tech>
                <Stack stacks={["Next.js", "Chakra UI"]} color="pink" />
              </Tech>
              <Links link="https://cibtools.chundev.com/" github="none" />
              <Sub2>現仍大受好評！</Sub2>
            </AnimationWrapper>

            <AnimationWrapper>
              <div className="experience-content-project">TangoBox</div>
              <Solve>
                JPBox 的前身，把過去發想之背單字 APP 做出，概念同 Anki
                為間隔重複記憶。
              </Solve>
              <Tech>
                <Stack
                  stacks={["Next.js", "CouchDB", "串接綠界"]}
                  color="pink"
                />
              </Tech>
              <Links
                link="none"
                github="https://github.com/latteouka/tangobox-lagacy"
              />
              <Sub2>
                自己處理前後端，為了高同步性也挑戰了很少見的 CouchDB。
              </Sub2>
            </AnimationWrapper>

            <AnimationWrapper>
              <div className="experience-content-project">
                自動定位工具（改寫）
              </div>
              <Solve>
                以 Next.js 重寫網頁，爬蟲程式以 Electron 重寫，前端並整合 Google
                Map API 方便直接查看地圖。
              </Solve>
              <Tech>
                <Stack
                  stacks={["Next.js", "Prisma", "Electron"]}
                  color="pink"
                />
              </Tech>
              <Links link="https://insloc.chundev.com/" github="none" />
            </AnimationWrapper>

            <AnimationWrapper>
              <div className="experience-content-project">JPBox</div>
              <Solve>
                意識到 TangoBox 以網頁方式對使用者的不方便，把同樣邏輯以 React
                Native 改寫並上架。
              </Solve>
              <Tech>
                <Stack stacks={["React Native", "RevenueCat"]} color="pink" />
              </Tech>
              <Links
                link="https://www.chundev.com/jpbox"
                github="https://github.com/latteouka/tangobox-app"
              />

              <Sub2>訂閱人數18人😭</Sub2>
            </AnimationWrapper>

            <AnimationWrapper>
              <div className="experience-content-project">
                Dorasha（ドラシャ）
              </div>
              <Solve>練習日文跟讀用的 APP，單句重播、循環播放等。</Solve>
              <Tech>
                <Stack stacks={["React Native", "RevenueCat"]} color="pink" />
              </Tech>
              <Links
                link="https://www.chundev.com/dorasha"
                github="https://github.com/latteouka/dorasha"
              />
            </AnimationWrapper>

            <AnimationWrapper>
              <div className="experience-content-project">Automaker</div>
              <Solve>
                依據朋友需求設計自動掛maker交易單，以Next.js API Route後端處理。
              </Solve>
              <Tech>
                <Stack
                  stacks={["Next.js", "API Route", "NextAuth"]}
                  color="pink"
                />
              </Tech>
              <Links
                link="https://www.chundev.com/automaker"
                github="https://github.com/latteouka/chundevcom/blob/main/pages/automaker/index.tsx"
              />
              <Sub2>用交易量收手續費！但FTX後來...</Sub2>
            </AnimationWrapper>
            {/* section 3 */}
            <div
              className="experience-content-subtitle"
              style={{ marginTop: "2rem" }}
            >
              WebGL
            </div>
            <Sub>I find my true love!</Sub>

            <AnimationWrapper>
              <div className="experience-content-project">心之所向官網</div>
              <Solve>
                參考網路上 three.js 教學，並用 react-three-fiber
                改寫，也學習使用 Blender 繪製 3D 場景。
              </Solve>
              <Tech>
                <Stack
                  stacks={["Next.js", "r3f", "gsap", "Blender"]}
                  color="green"
                />
              </Tech>
              <Links
                link="https://www.lecoeur-patisserie.com/index2"
                github="https://github.com/latteouka/lecoeur"
              />
              <Sub2>Blender也太好玩了吧！</Sub2>
            </AnimationWrapper>

            <AnimationWrapper>
              <div className="experience-content-project">
                THREE Dynamic Grid
              </div>
              <Solve>
                嘗試結合 three.js 與 html 元素，也因為後來更了解底層 WebGL
                ，改以純 three.js 實作，期望能反過來更理解react-three-fiber。
              </Solve>
              <Tech>
                <Stack stacks={["Vallina", "three", "shaders"]} color="green" />
              </Tech>
              <Links
                link="https://mapping-gallery.vercel.app/"
                github="https://github.com/latteouka/mapping-gallery"
              />
              <Sub2>開始接觸更多日文資源。</Sub2>
            </AnimationWrapper>

            <AnimationWrapper>
              <div className="experience-content-project">Simple Editor</div>
              <Solve>
                好奇3D的SDK是如何製作，於是自己試著挑戰看看最基礎的功能。
              </Solve>
              <Tech>
                <Stack stacks={["Next.js", "r3f"]} color="green" />
              </Tech>
              <Links
                link="https://r3f-simple-editor.vercel.app/"
                github="https://github.com/latteouka/r3f-simple-editor"
              />
            </AnimationWrapper>

            <AnimationWrapper>
              <div className="experience-content-project">Shader Light</div>
              <Solve>為網站點盞燈吧。</Solve>
              <Tech>
                <Stack stacks={["Next.js", "three", "shaders"]} color="green" />
              </Tech>
              <Links
                link="https://ariel.chundev.com/"
                github="https://github.com/latteouka/ariel"
              />
            </AnimationWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Path;

const Solve = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="experience-solve">
      <div className="experience-solve-title">Solve：</div>
      <div>{children}</div>
    </div>
  );
};

const Tech = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="experience-tech">
      <div className="experience-solve-title">Tech：</div>
      {children}
    </div>
  );
};

interface StackProps {
  stacks: string[];
  color: string;
}

const Stack = ({ stacks, color }: StackProps) => {
  let hex: string = "#e0e7ff";
  if (color === "blue") {
    hex = "#e0e7ff";
  } else if (color === "pink") {
    hex = "#f8cfcf";
  } else if (color === "green") {
    hex = "#caead6";
  }
  return (
    <>
      {stacks.map((stack, index) => {
        return (
          <div key={index}>
            <div className="experience-stack" style={{ backgroundColor: hex }}>
              {stack}
            </div>
            {index !== stacks.length - 1 ? ", " : ""}
          </div>
        );
      })}
    </>
  );
};
