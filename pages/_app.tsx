import "@styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { TextContext, EditTextContext } from "@contexts";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-quill/dist/quill.core.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TextContext text={pageProps.text}>
        <EditTextContext>
          <Component {...pageProps} />
        </EditTextContext>
      </TextContext>
    </QueryClientProvider>
  );
}
