import TodoById from "@/pages/todos/[id]";
import axios from "axios";
import { IncomingHttpHeaders } from "http";

async function getTodoById(
  id: Number,
  cookies?: IncomingHttpHeaders["cookie"],
): Promise<Todo> {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL + `todos/${id}`,
    {
      withCredentials: true,
      headers: {
        Cookie: cookies,
      },
    },
  );
  return res.data;
}

interface IgetTodoParams {
  orderBy?: "creationDate" | "updateDate" | "title";
  filters?: {
    done: boolean;
    tags: string[];
  };
  cookies?: IncomingHttpHeaders["cookie"];
  pageIndex?: number;
}

async function getAllTodos({
  orderBy,
  filters,
  pageIndex,
  cookies,
}: IgetTodoParams): Promise<Todo[]> {
  const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "todos", {
    withCredentials: true,
    headers: {
      Cookie: cookies,
    },
  });
  return res.data;
}

async function updateTodo(todo: Todo) {
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL + `todos/${todo.id}`,
    todo,
    {
      withCredentials: true,
    },
  );
  return res.data;
}

async function getAllUserSettings(cookies: IncomingHttpHeaders["cookie"]) {
  const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "settings", {
    withCredentials: true,
    headers: {
      Cookie: cookies,
    },
  });
  return res.data;
}

async function getUserSettingByKey(
  key: string,
  cookies?: IncomingHttpHeaders["cookie"],
) {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL + `settings/${key}`,
    {
      withCredentials: true,
      headers: {
        Cookie: cookies,
      },
    },
  );
  return res.data[key];
}

async function setUserSettings(key: string, value: any) {
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL + `settings/${key}`,
    {
      key: key,
      value: value,
    },
    {
      withCredentials: true,
    },
  );
}

async function addTodo(params: Omit<Todo, "id">): Promise<Todo> {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "todos",
    params,
    {
      withCredentials: true,
    },
  );
  return res.data;
}

async function deleteTodo(id: number | Todo) {
  let _id: number;
  if (typeof id == "number") {
    _id = id;
  } else {
    _id = id.id;
  }
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL + `todos/${_id}`,
    {
      withCredentials: true,
    },
  );
  return res.data;
}

export {
  getTodoById,
  getAllTodos,
  updateTodo,
  getAllUserSettings,
  getUserSettingByKey,
  setUserSettings,
  addTodo,
  deleteTodo,
};
