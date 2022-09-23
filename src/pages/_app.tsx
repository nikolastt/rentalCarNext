import "../styles/globals.css";
import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";

import { store } from "../redux/store";
import { Provider } from "react-redux";

import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../createEmotionCache";
import darkThemeMUI from "../styles/themeMUI";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(
  { Component, pageProps: { session, ...pageProps } }: AppProps,
  props: MyAppProps
) {
  const { emotionCache = clientSideEmotionCache } = props;
  return (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={darkThemeMUI}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />

          <Provider store={store}>
            <SessionProvider session={session}>
              <Component {...pageProps} />
            </SessionProvider>
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
