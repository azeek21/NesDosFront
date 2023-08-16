import { Inter } from "next/font/google";
import Header from "@/components/Header";
import CreationForm from "@/components/CreationForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <Header />
    </main>
  );
}

{
  /* <List className="h-28 overflow-y-auto"></List> */
}

{
  /* <div className="flex max-w-xs flex-col">
<ListItem type="card" className="flex flex-col gap-2">
  <h1 className="flex border-b border-b-green-400 pb-1 text-xl">
    This is title{" "}
    <span className="ml-auto">
      <input type="checkbox" name="" id="" checked />
    </span>
  </h1>
  <p>This is content of this todo here right ?</p>
  <div className="flex justify-end gap-4">
    <Button className="border-green-400 text-green-400">Save</Button>
    <Button className="border-red-400 text-red-400">Delete</Button>
  </div>
</ListItem>
</div> */
}
