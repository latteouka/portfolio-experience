import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>chundev</title>
        <meta name="description" content="Hi, I am Yi Chun." />
      </Head>
      <body>
        <Main />
        <NextScript />
        <canvas className="l-canvas"></canvas>
      </body>
    </Html>
  );
}
