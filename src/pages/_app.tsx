import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '../lib/react-query-config';
import { useState } from 'react';
import Devtools from '../components/Devtools';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [queryClient] = useState(() => new QueryClient(config))

  return (
    <>
      <Head>
        <title>Who is the Strongest Marvel?</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
          <Devtools />
          </Hydrate>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}