import "@styles/globals.css";
import type { AppProps } from "next/app";
import { TextContext, EditTextContext } from "@contexts";
import { QueryClient, QueryClientProvider } from "react-query";
import { captureUIErrorSetup } from "@lib/utils";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  useEffect(captureUIErrorSetup, []);

  return (
    <SessionProvider
      session={pageProps.session?.data}
      basePath={`/api/auth/next-auth`}
      baseUrl={process.env.NEXTAUTH_URL}
    >
      <QueryClientProvider client={queryClient}>
        <TextContext text={pageProps.text}>
          <EditTextContext>
            <Component {...pageProps} />
          </EditTextContext>
        </TextContext>
      </QueryClientProvider>
    </SessionProvider>
  );
}
