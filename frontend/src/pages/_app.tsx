import "../styles/globals.css";
import "../styles/react-calendar.css";
import "../styles/basic.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "../hooks/store";
import AuthCheckProvider from "../components/auth/AuthCheckProvider";
import Head from "next/head";
import "regenerator-runtime/runtime";
import { RecoilRoot } from "recoil";

const colors = {
  jael: "FB8C6A",
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <AuthCheckProvider>
              <Head>
                <title>JAEL | for Japanese language learners</title>
                <meta
                  name="description"
                  content="There are contents for Japanese language learners to study efficiently, please check out!"
                />
                <link rel="shortcut icon" href="/JAEL_LOGO.png" />
                <link
                  rel="apple-touch-icon"
                  sizes="180x180"
                  href="/JAEL_LOGO.png"
                />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="32x32"
                  href="/JAEL_LOGO.png"
                />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="16x16"
                  href="/JAEL_LOGO.png"
                />
                <link rel="mask-icon" href="/JAEL_LOGO.png" color="#5bbad5" />
              </Head>
              <Component {...pageProps} />
            </AuthCheckProvider>
          </Provider>
        </QueryClientProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
