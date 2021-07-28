import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import "@fontsource/shadows-into-light";

import theme from "../theme";
import { Hydrate } from "react-query/hydration";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false
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
            <Component {...pageProps} />
          </Hydrate>
        </ColorModeProvider>
      </ChakraProvider>
      {/* <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools> */}
    </QueryClientProvider>
  );
}

export default MyApp;
