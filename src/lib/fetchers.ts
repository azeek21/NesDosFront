async function getTodo(id: Number) {
  return (await fetch(process.env.BASE_URL + "/todos/" + id)).json();
}

interface IgetTodoParams {
  orderBy?: "creationDate" | "updateDate" | "title";
  filters?: {
    done: boolean;
    tags: string[];
  };
  pageIndex?: number;
}

async function getTodos({ orderBy, filters, pageIndex }: IgetTodoParams) {
  const res = await (await fetch(process.env.BASE_URL + "/todos")).json();
  return res;
}
