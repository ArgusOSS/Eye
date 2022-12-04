/* eslint-disable import/no-default-export */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import "../styles/globals.css";
// import theme from '../src/theme';
import Head from "next/head";
import { CookiesProvider } from "react-cookie";
// eslint-disable-next-line import/no-unresolved
import PropTypes from "prop-types";
import { CacheProvider } from "@emotion/react";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useState, useEffect } from "react";
import { NotificationsProvider } from "@mantine/notifications";
import createEmotionCache from "../src/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [colorScheme, setColorScheme] = useState("");
  useEffect(() => {
    if (colorScheme !== "") {
      localStorage.setItem("colorScheme", colorScheme);
    }
  }, [colorScheme]);
  useEffect(() => {
    const storedState = localStorage.getItem("colorScheme");
    if (storedState) {
      setColorScheme(storedState);
    }
  }, []);
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Eye</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <CookiesProvider>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <NotificationsProvider>
            <MantineProvider
              theme={{
                colorScheme,
                globalStyles: (theme) => ({
                  "g>rect": {
                    fill: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
                  },
                }),
              }}
              withGlobalStyles
              withNormalizeCSS
            >
              <Component {...pageProps} />
            </MantineProvider>
          </NotificationsProvider>
        </ColorSchemeProvider>
      </CookiesProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
