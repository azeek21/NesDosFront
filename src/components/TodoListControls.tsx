import { useStore } from "zustand";
import Button from "./UI/Button";
import Input from "./UI/Inpute";
import useGlobalStore from "@/store";
import { ChangeEvent } from "react";
import { useRouter } from "next/router";

export default function TodosListControls() {
  const router = useRouter();

  function handleChange(ev: ChangeEvent<HTMLInputElement>) {
    const val = ev.target.value;
    if (val) {
      router.replace({
        query: { ...router.query, search: ev.target.value },
      });
    } else {
      const q = router.query;
      delete q.search;
      router.replace({
        query: q,
      });
    }
  }

  return (
    <div className="flex w-full items-center justify-end gap-4 border-b border-b-neutral-400 pb-2">
      <Input
        type="text"
        placeholder="Search..."
        className="px-2 py-1 text-lg"
        onChange={handleChange}
        value={router.query.search || ""}
      />
      <div className="flex h-min gap-1 text-sm">
        <Button compact>Sort</Button>
        <Button compact>Filter</Button>
      </div>
    </div>
  );
}
