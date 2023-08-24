import { Inter } from "next/font/google";
import { useQuery } from "react-query";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import axios from "axios";
import { getAllTodos } from "@/lib/fetchers";
import TodosList from "@/components/TodosList";
import TodosListControls from "@/components/TodoListControls";
// const inter = Inter({ subsets: ["latin"] });

interface IHomeProps {
  todos: Todo[];
  error?: string;
}

export default function Home({ todos, error }: IHomeProps) {
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

  if (error) {
    return <h1 className="text-red-500">{error}</h1>;
  }

  return (
    <main className="m-auto mt-4 flex max-w-screen-xl flex-wrap items-start justify-center  gap-4">
      <TodosListControls />
      {data && <TodosList todos={data} />}
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
    return {
      props: {
        todos: todos,
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
