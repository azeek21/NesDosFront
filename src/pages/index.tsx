import { Inter } from "next/font/google";
import { useQuery } from "react-query";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import axios from "axios";
import { getAllTodos, getAllUserSettings } from "@/lib/fetchers";
import TodosList from "@/components/TodosList";
import TodosListControls from "@/components/TodoListControls";
import useGlobalStore from "@/store";
import { useEffect } from "react";
// const inter = Inter({ subsets: ["latin"] });
interface IHome {
  settings: any;
}
export default function Home({ settings }: IHome) {
  const [listStyle, setListStyle] = useGlobalStore((s) => [
    s.listStyle,
    s.setListStyle,
  ]);
  console.log("list:", listStyle);
  useEffect(() => {
    setListStyle(settings["value"]);
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
