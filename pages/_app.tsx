import "@styles/globals.css";
import type { AppProps } from "next/app";
import { TextContext, EditTextContext, AlertContext } from "@contexts";
import { QueryClient, QueryClientProvider } from "react-query";
import { captureUIErrorSetup } from "@lib/utils";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  useEffect(captureUIErrorSetup, []);

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Website description goes here."
          key="desc"
        />
      </Head>

      <SessionProvider
        session={pageProps.session?.data}
        basePath={`/api/auth/next-auth`}
        baseUrl={process.env.NEXTAUTH_URL}
      >
        <QueryClientProvider client={queryClient}>
          <TextContext text={pageProps.text}>
            <EditTextContext>
              <AlertContext>
                <Component {...pageProps} />
              </AlertContext>
            </EditTextContext>
          </TextContext>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
