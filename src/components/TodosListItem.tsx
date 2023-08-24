import Button from "./UI/Button";
import Tag from "./Tag";
import Input from "./UI/Inpute";
import ListItem from "./UI/List/ListItem";
import { Delete, EditNote } from "@mui/icons-material";
import Link from "./UI/Link";
import { useQuery, useQueryClient } from "react-query";
import { getTodoById, updateTodo } from "@/lib/fetchers";
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

  const color = data.done
    ? "!text-green-500 accent-green-500 border-green-800"
    : "text-inherit";
  return (
    <ListItem
      style={{ viewTransitionName: `card-${data.id}` }}
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
          style={{
            viewTransitionName: `card-${data.id}-checkbox`,
          }}
          className="mr-1 focus:shadow-md focus:shadow-blue-500"
        />
        <Link href={`/todos/${data.id}`}>
          <h1
            style={{ viewTransitionName: `card-${data.id}-title` }}
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
          <div
            className="ml-6 flex gap-2"
            style={{ viewTransitionName: `card-${data.id}-tags` }}
          >
            <Tag>Tag1 </Tag>
            <Tag>Tag2</Tag>
          </div>
        )}
      </div>
      {style == "card" && <hr className=" border-neutral-500" />}
      <div
        className={`relative mt-1 h-full overflow-hidden opacity-70 before:absolute before:bottom-0 before:left-0 before:right-0 before:z-10 before:w-full before:bg-gradient-to-t before:from-black before:to-transparent ${
          style == "card" ? "before:h-1/3" : "before:h-1/5"
        }`}
      >
        <p style={{ viewTransitionName: `card-${data.id}-content` }}>
          {data.content}
        </p>
      </div>
      {style == "card" && (
        <div className="mt-auto flex items-center justify-end gap-4 pt-2">
          <div
            className="no-scrollbar mr-auto flex w-full gap-2 overflow-x-auto"
            style={{ viewTransitionName: `card-${data.id}-tags` }}
          >
            <Tag>Tag1 </Tag>
            <Tag>Tag1 </Tag>
            <Tag>Tag2</Tag>
          </div>

          <div className="flex gap-1 text-xs opacity-70">
            <Button>
              <EditNote />
            </Button>
            <Button className="border-red-600 text-xs text-red-600">
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
//     <Input checked={todo.done} type="checkbox" />
//   </div>
// </div>
// <div className={`text-neutral-200 text-opacity-70`}>
//   <p className={`${color}`}>{todo.content}</p>
// </div>
// </li>
