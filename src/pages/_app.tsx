import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import "@fontsource/shadows-into-light";
import Head from "next/head";
import theme from "../theme";
import { Hydrate } from "react-query/hydration";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

function MyApp({ Component, pageProps }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Hydrate state={pageProps.dehydratedState}>
            <Head>
              <title>Instapic</title>
              <meta property="og:title" content="Instapic" key="title"></meta>
            </Head>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"
                key="viewport"
              />
            </Head>
            <Head>
              <link
                rel="apple-touch-icon"
                sizes="57x57"
                href="/static/apple-icon-57x57.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="60x60"
                href="/static/apple-icon-60x60.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="72x72"
                href="/static/apple-icon-72x72.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="76x76"
                href="/static/apple-icon-76x76.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="114x114"
                href="/static/apple-icon-114x114.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="120x120"
                href="/static/apple-icon-120x120.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="144x144"
                href="/static/apple-icon-144x144.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="152x152"
                href="/static/apple-icon-152x152.png"
              />
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/static/apple-icon-180x180.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="192x192"
                href="/static/android-icon-192x192.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/static/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="96x96"
                href="/static/favicon-96x96.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/static/favicon-16x16.png"
              />
              <link rel="manifest" href="/static/manifest.json" />
              <meta name="msapplication-TileColor" content="#ffffff" />
              <meta
                name="msapplication-TileImage"
                content="/ms-icon-144x144.png"
              />
              <meta name="theme-color" content="#ffffff" />
            </Head>
            <Component {...pageProps} />
          </Hydrate>
        </ColorModeProvider>
      </ChakraProvider>
      {/* <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools> */}
    </QueryClientProvider>
  );
}

export default MyApp;
