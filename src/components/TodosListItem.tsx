import Button from "./UI/Button";
import Tag from "./Tag";
import Input from "./UI/Inpute";
import ListItem from "./UI/List/ListItem";
import { Delete, EditNote } from "@mui/icons-material";
import Link from "./UI/Link";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTodo, getTodoById, updateTodo } from "@/lib/fetchers";

interface ITodosListItem {
  style: "list" | "card";
  todo: Todo;
}

export default function TodosListItem({ todo, style }: ITodosListItem) {
  const queryClinet = useQueryClient();
  const { data, isLoading, error } = useQuery(
    [`todo-${todo.id}`],
    async () => {
      return getTodoById(todo.id);
    },
    {
      initialData: todo,
    },
  );

  const mutator = useMutation({
    mutationFn: async () => {
      return deleteTodo(todo.id);
    },
    onSuccess: () => {
      console.log("invalidating...");
      queryClinet.setQueryData("todos", (todos: any) => {
        console.log("wee");
        return todos.filter((t: Todo) => t.id != todo.id);
      });
    },
  });

  if (!data || error) {
    console.log("ERROR: ", error);
    return (
      <h1 className="text-red-400">Something went wrong! Look at console...</h1>
    );
  }

  async function toggleDone() {
    if (data) {
      await updateTodo({ ...data, done: !data.done });
      queryClinet.invalidateQueries(`todo-${todo.id}`);
    }
  }

  const isPending = isLoading || mutator.isLoading;
  const color = isPending
    ? "accent-neutral-500 border-neutral-500 !text-neutral-500"
    : data.done
    ? "!text-green-500 accent-green-500 border-green-800"
    : "text-inherit";
  return (
    <ListItem
      type={style}
      className={`${color} ${
        style == "card" ? "flex flex-col overflow-hidden" : "py-4"
      }`}
    >
      <div className="text-x4 mb-2 flex items-center justify-start overflow-hidden">
        <Input
          type="checkbox"
          checked={data.done}
          readOnly
          onChange={toggleDone}
          disabled={isPending}
          className="mr-1 focus:shadow-md focus:shadow-blue-500"
        />
        <Link href={`/todos/${data.id}`}>
          <h1
            className={`${
              style == "card"
                ? "w-80 overflow-hidden text-ellipsis whitespace-nowrap"
                : ""
            } py-4 text-xl ${color}`}
          >
            {data.title}
          </h1>
        </Link>

        {style == "list" && (
          // tags
          <>
            <div className="ml-6 flex gap-2">
              <Tag>Tag1 </Tag>
              <Tag>Tag2</Tag>
            </div>
            <Button
              disabled={isPending}
              className="ml-auto border-red-600 text-xs text-red-600"
              onClick={() => {
                mutator.mutate();
              }}
            >
              <Delete />
            </Button>
          </>
        )}
      </div>
      {style == "card" && <hr className=" border-neutral-500" />}
      <div
        className={`relative mt-1 h-full overflow-hidden opacity-70 before:absolute before:bottom-0 before:left-0 before:right-0 before:z-10 before:w-full before:bg-gradient-to-t before:from-black before:to-transparent ${
          style == "card" ? "before:h-1/3" : "before:h-1/5"
        }`}
      >
        <p>{data.content}</p>
      </div>
      {style == "card" && (
        <div className="mt-auto flex items-center justify-end gap-4 pt-2">
          <div className="no-scrollbar mr-auto flex w-full gap-2 overflow-x-auto">
            <Tag>Tag1 </Tag>
            <Tag>Tag1 </Tag>
            <Tag>Tag2</Tag>
          </div>

          <div className="flex gap-1 text-xs opacity-70">
            <Button
              disabled={isPending}
              className="border-red-600 text-xs text-red-600"
              onClick={() => {
                mutator.mutate();
              }}
            >
              <Delete />
            </Button>
          </div>
        </div>
      )}
    </ListItem>
  );
}

// <li className={`border-b border-neutral-400 py-4 ${color}`}>
// {/* top */}
// <div className="flex items-center">
//   <h1 className="text-2xl">{data.title}</h1>
//   {/* tags */}
//   <div className="ml-8 flex gap-2">
//     <Tag>Tag1 </Tag>
//     <Tag>Tag2</Tag>
//   </div>
//   {/* actions */}
//   <div className="ml-auto">
//     <Inpudt checked={todo.done} type="checkbox" />
//   </div>
// </div>
// <div className={`text-neutral-200 text-opacity-70`}>
//   <p className={`${color}`}>{todo.content}</p>
// </div>
// </li>
