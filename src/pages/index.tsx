import { Inter } from "next/font/google";
import { useQuery } from "react-query";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getAllUserSettings } from "@/lib/fetchers";

import useGlobalStore from "@/store";
import { useEffect } from "react";
// const inter = Inter({ subsets: ["latin"] });
interface IHome {}
export default function Home({}: IHome) {
  return <h1>Home page</h1>;
}
