import "@styles/globals.css";
import type { AppProps } from "next/app";
import { AlertContext } from "@contexts";
import { QueryClient, QueryClientProvider } from "react-query";
import { captureUIErrorSetup } from "@lib/utils";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { TextUpdateProvider } from "easy-text-update";
import { AdminClient } from "@lib";
import text from "../text.json";

const queryClient = new QueryClient();

const saveText = async (text: any) => {
  try {
    const { data } = await AdminClient.updateText(text);
    if (data.success) {
      alert("Text saved successfully");
    } else {
      alert("Error saving text");
    }
  } catch (err) {
    console.log(err);
    alert("Error saving text");
  }
};

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
          <TextUpdateProvider
            text={text}
            save={saveText}
            active={true} // TODO: check user role
          >
            <AlertContext>
              <Component {...pageProps} />
            </AlertContext>
          </TextUpdateProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
