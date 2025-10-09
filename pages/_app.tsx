import "@/styles/globals.scss";

import type { AppProps } from "next/app";

import { DefaultSeo } from "next-seo";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        {...{
          title: "Dawoon's blog",
          description: "Dawoon's blog",
          openGraph: {
            type: "website",
            locale: "ko_KR",
            url: "https://dawoon.com",
          },
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
