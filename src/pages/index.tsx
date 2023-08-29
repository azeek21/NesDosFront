import { Inter } from "next/font/google";
import { useQuery } from "react-query";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getAllUserSettings, getUserSettingByKey } from "@/lib/fetchers";

import useGlobalStore from "@/store";
import { useEffect } from "react";
import Header from "@/components/Header";
import axios from "axios";
// const inter = Inter({ subsets: ["latin"] });
interface IHome {
  listyStyle: "card" | "list";
  error?: string;
}
export default function Home({ listyStyle, error }: IHome) {
  if (error) {
    console.error(error);
  }
  return (
    <main>
      <h1>Home page</h1>
    </main>
  );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  try {
    const cookies = req.headers.cookie;
    const resp = await getUserSettingByKey("listViewStyle", cookies);
    return {
      props: {
        listStyle: resp,
      },
    };
  } catch (e) {
    return {
      props: {
        error: "Can't fetch user settings",
      },
    };
  }
}
