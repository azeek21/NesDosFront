import { Inter } from "next/font/google";
import { useQuery, useQueryClient } from "react-query";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import axios from "axios";
import {
  addTodo,
  getAllTodos,
  getAllUserSettings,
  getUserSettingByKey,
} from "@/lib/fetchers";
import TodosList from "@/components/TodosList";
import TodosListControls from "@/components/TodoListControls";
import { useEffect } from "react";
import useGlobalStore from "@/store";
import Header from "@/components/Header";
import Button from "@/components/UI/Button";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/router";
// const inter = Inter({ subsets: ["latin"] });

interface IHomeProps {
  todos: Todo[];
  error?: string;
  listViewStyle: "card" | "list";
}

export default function Todos({ todos, error, listViewStyle }: IHomeProps) {
  const router = useRouter();
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

  const { data: style } = useQuery(
    ["listStyle"],
    () => {
      return getUserSettingByKey("listViewStyle");
    },
    {
      initialData: listViewStyle,
    },
  );

  if (error) {
    return <h1 className="text-red-500">{error}</h1>;
  }

  return (
    <>
      <Header style={style} />
      <main className="m-auto mt-4 flex max-w-screen-xl flex-wrap items-start  justify-center gap-4">
        <TodosListControls />
        {data && <TodosList todos={data} style={style} />}
        <Button
          className="fixed bottom-8 right-8 shadow-lg shadow-neutral-300"
          onClick={async () => {
            const res = await addTodo({ title: "", content: "", done: false });
            router.push(`/todos/${res.id}`);
          }}
        >
          <Add />
        </Button>
      </main>
    </>
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
