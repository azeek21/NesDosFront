import { Inter } from "next/font/google";
import { useQuery } from "react-query";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import axios from "axios";
import { getAllTodos, getAllUserSettings } from "@/lib/fetchers";
import TodosList from "@/components/TodosList";
import TodosListControls from "@/components/TodoListControls";
import { useEffect } from "react";
import useGlobalStore from "@/store";
// const inter = Inter({ subsets: ["latin"] });

interface IHomeProps {
  todos: Todo[];
  error?: string;
  listViewStyle: "card" | "list";
}

export default function Home({ todos, error, listViewStyle }: IHomeProps) {
  const [listStyle, setViewStyle] = useGlobalStore((s) => [
    s.listStyle,
    s.setListStyle,
  ]);
  const { data, isError, isLoading } = useQuery(
    ["todos"],
    async () => {
      const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "todos", {
        withCredentials: true,
      });
      return res.data;
    },
    {
      initialData: todos,
    },
  );

  useEffect(() => {
    setViewStyle(listViewStyle);
  }, []);

  if (error) {
    return <h1 className="text-red-500">{error}</h1>;
  }

  const style = typeof window === "undefined" ? listViewStyle : listStyle;
  return (
    <main className="m-auto mt-4 flex max-w-screen-xl flex-wrap items-start justify-center  gap-4">
      <TodosListControls />
      {data && <TodosList todos={data} style={style} />}
    </main>
  );
}

export async function getServerSideProps({
  req,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> {
  try {
    const todos = await getAllTodos({
      cookies: req.headers.cookie,
    });
    const settings = await getAllUserSettings(req.headers.cookie);

    return {
      props: {
        todos: todos,
        listViewStyle: settings["listViewStyle"],
      },
    };
  } catch (e: any) {
    let errorMessage = "";
    if (e.response) {
      errorMessage = e.response.data;
    } else if (e.request) {
      errorMessage =
        "Server did not responded, we are working on it ...\nWe are sorry for the inconvenience :(";
    } else {
      errorMessage =
        "Internal error occoured, you can see the error in the console";
      console.log(e);
    }

    return {
      props: {
        todos: [],
        error: errorMessage,
      },
    };
  }
}
