import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import { createContext } from "react";
import globalStore from "@/store";
import { GetServerSidePropsContext } from "next";
import { getAllUserSettings, getUserSettingByKey } from "@/lib/fetchers";

const StoreContext = createContext<any>(null);

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreContext.Provider value={globalStore}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </StoreContext.Provider>
  );
}
