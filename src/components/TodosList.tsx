import useGlobalStore from "@/store";
import TodosListItem from "./TodosListItem";
import ListItem from "./UI/List/ListItem";
import { useRouter } from "next/router";
import { getListStyle } from "@/utils/utils";

interface ITodosListProops {
  todos: Todo[];
}
export default function TodosList({ todos }: ITodosListProops) {
  const router = useRouter();
  let style = getListStyle(router.query.style);

  return (
    <div className="w-full">
      <ol
        className={`flex gap-4 px-4 sm:px-8 ${
          style == "card"
            ? "flex-row flex-wrap items-start justify-center"
            : "flex-col"
        }`}
      >
        {todos.map((t) => (
          <TodosListItem todo={t} style={style} key={t.id} />
        ))}
      </ol>
    </div>
  );
}
