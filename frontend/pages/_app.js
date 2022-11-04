import '../styles/globals.css'
import theme from '../src/theme';
import Head from 'next/head';
import { CookiesProvider } from "react-cookie"
import PropTypes from 'prop-types';
import createEmotionCache from '../src/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import { ColorSchemeProvider, MantineProvider, ColorScheme } from '@mantine/core';
import { useState } from 'react';


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [colorScheme, setColorScheme] = useState('dark');
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

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
            <MantineProvider 
            theme={{colorScheme}}  
            withGlobalStyles 
            withNormalizeCSS>
              <Component {...pageProps} />
            </MantineProvider>
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