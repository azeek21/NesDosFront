import { Inter } from "next/font/google";
import { useQuery } from "react-query";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getAllUserSettings } from "@/lib/fetchers";

import useGlobalStore from "@/store";
import { useEffect } from "react";
// const inter = Inter({ subsets: ["latin"] });
interface IHome {
  settings: Record<string, any>;
}
export default function Home({ settings }: IHome) {
  const setListStyle = useGlobalStore((s) => s.setListStyle);
  useEffect(() => {
    console.log("ee: ", settings);
    setListStyle(settings["listViewStyle"]);
  }, []);
  return <h1>Home page</h1>;
}
export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const res = await getAllUserSettings(req.headers.cookie);
  console.log("fetching: ", res);
  return {
    props: {
      settings: res,
    },
  };
}
