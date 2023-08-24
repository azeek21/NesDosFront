import { useStore } from "zustand";
import Button from "./UI/Button";
import Input from "./UI/Inpute";
import useGlobalStore from "@/store";

export default function TodosListControls() {
  const [searchText, setSearchText] = useGlobalStore((s) => [
    s.search,
    s.setSearch,
  ]);

  return (
    <div className="flex w-full items-center justify-end gap-4 border-b border-b-neutral-400 pb-2">
      <Input
        type="text"
        placeholder="Search..."
        className="px-2 py-1 text-lg"
        onChange={(ev) => {
          setSearchText(ev.target.value);
        }}
        value={searchText}
      />
      <div className="flex h-min gap-1 text-sm">
        <Button compact>Sort</Button>
        <Button compact>Filter</Button>
      </div>
    </div>
  );
}
