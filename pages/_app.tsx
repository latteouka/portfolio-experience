import { Contents } from "@/gl/parts/contents";
import "@/styles/style.scss";
import type { AppProps } from "next/app";
import { useEffect, useRef } from "react";
import { Noto_Sans_JP, Anton, Outfit } from "next/font/google";
import useLenis from "@/utils/useLenis";

const notojp = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--noto-font",
});
const anton = Outfit({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--anton-font",
});

export default function App({ Component, pageProps }: AppProps) {
  const three = useRef<Contents>();

  useLenis();
  useEffect(() => {
    if (three.current) return;
    three.current = new Contents(document.querySelector(".l-canvas"));
  }, []);

  return (
    <main className={`${notojp.variable} ${anton.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
