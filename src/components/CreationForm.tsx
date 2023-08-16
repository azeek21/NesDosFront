import { ChangeEvent, useState } from "react";
import Input from "./UI/Inpute";

export default function CreationForm() {
  const [data, setData] = useState({
    title: "",
    content: "",
  });

  function handleChange(ev: ChangeEvent<HTMLInputElement>) {
    const name = ev.target.name;
    const value = ev.target.value;
    if (name) {
      setData((old) => ({ ...old, [name]: value }));
    }
  }

  return (
    <form
      action=""
      onSubmit={() => console.log("submit")}
      className="flex flex-col gap-4"
    >
      <Input
        type="text"
        title="Title"
        value={data.title}
        name="title"
        onChange={handleChange}
      />
      <Input
        type="text"
        title="Content"
        name="content"
        value={data.content}
        onChange={handleChange}
      />
    </form>
  );
}
