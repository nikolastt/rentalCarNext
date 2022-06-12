import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider as ThemeProviderMUI } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../styles/themes/MUIThemes/dark";
import createEmotionCache from "../createEmotionCache";

import dark from "../styles/themes/dark";

import { store } from "../redux/store";
import { Provider } from "react-redux";
import GlobalStyles from "../styles/GlobalStyles";
import { ThemeProvider } from "styled-components";

import { SessionProvider } from "next-auth/react";

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
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProviderMUI theme={theme}>
        <ThemeProvider theme={dark}>
          <CssBaseline />
          <Provider store={store}>
            <GlobalStyles />
            <SessionProvider session={session}>
              <Component {...pageProps} />
            </SessionProvider>
          </Provider>
        </ThemeProvider>
      </ThemeProviderMUI>
    </CacheProvider>
  );
}
