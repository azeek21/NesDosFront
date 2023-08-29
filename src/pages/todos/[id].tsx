import Button from "@/components/UI/Button";
import Input from "@/components/UI/Inpute";
import { getTodoById, updateTodo } from "@/lib/fetchers";
import { useDebouncer } from "@/lib/hooks";
import { Save } from "@mui/icons-material";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState, ChangeEvent, useCallback, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
interface ITodoByIdProps {
  initialTodo: Todo;
  error?: string;
}

export default function TodoById({ initialTodo, error }: ITodoByIdProps) {
  const router = useRouter();
  const autofocusRef = useRef<HTMLInputElement>();

  const id = router.query.id;
  const {
    data,
    isError,
    isLoading,
    error: errorMessage,
  } = useQuery(
    [`todo-${id}`],
    async () => {
      return getTodoById(66);
    },
    {
      initialData: initialTodo,
    },
  );

  if (!data) {
    return (
      <h1 className="text-red-500">
        Something went terribly wrong and I have no idea
      </h1>
    );
  }

  const [todo, setTodo] = useState(data);
  const {
    mutate,
    isLoading: mutationLoading,
    isError: isMutationError,
  } = useMutation({
    mutationFn: async () => {
      const res = await updateTodo(todo);
      setTodo(res);
    },
    onSettled: () => {
      setTimeout(() => {
        autofocusRef.current?.focus();
      }, 0);
    },
  });

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    mutate();
  }
  const debounce = useDebouncer(600, "updatetodo");

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const name = event.target.name;
    let value: any = event.target.value;
    if (event.target.type == "checkbox") {
      // @ts-ignore
      value = event.target.checked;
    }
    if (name) {
      // @ts-ignore
      autofocusRef.current = event.target;
      setTodo((old) => ({ ...old, [name]: value }));
      debounce(mutate, "updatetodo");
    }
  }

  const isPending = isLoading || mutationLoading;
  console.log("pending: ", isPending);
  return (
    <main className="mt-8 p-8 text-neutral-400" key={`todo-${todo.id}-main`}>
      <form
        key={`todo-${todo.id}-form`}
        onSubmit={handleSubmit}
        className={`flex flex-col rounded-2xl border border-neutral-400 p-4 ${
          isPending ? "opacity-50" : ""
        }`}
      >
        <div className="flex items-center ">
          <Input
            type="checkbox"
            checked={todo.done}
            name="done"
            onChange={handleChange}
            disabled={isPending}
          />
          <Input
            disabled={isPending}
            type="text"
            value={todo.title}
            onChange={handleChange}
            className="w-full rounded-none border-l-0 border-r-0 border-t-0 px-4 py-2 text-xl text-white"
            name="title"
            placeholder="Do good great things..."
          />
        </div>
        <textarea
          disabled={isPending}
          value={todo.content}
          onChange={handleChange}
          name="content"
          rows={15}
          placeholder="Level up!"
          className="no-scollbar h-full w-full border-none bg-transparent text-lg outline-none focus-within:text-white"
        />
        <div className="flex items-center pt-4">
          <Input
            placeholder="Tags"
            className="w-full border-none py-1 text-base"
          />
          <Button
            className="border-green-600 text-green-500"
            disabled={isPending}
          >
            <Save />
          </Button>
        </div>
      </form>
    </main>
  );
}

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> {
  let id: any = params?.id;
  if (!id) {
    return {
      props: {
        error: "Bad todo id",
      },
    };
  }
  id = Number(id);
  if (isNaN(id)) {
    return {
      props: {
        error: "Id should be a number",
      },
    };
  }

  try {
    const todo = await getTodoById(id, req.headers.cookie);
    return {
      props: {
        initialTodo: todo,
      },
    };
  } catch (e: any) {
    let errorMessage = "";
    if (e.response) {
      errorMessage = e.response.data.message;
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
        initialTodo: null,
        error: errorMessage,
      },
    };
  }
}
