import { setUserSettings } from "@/lib/fetchers";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IGlobalStore {
  listStyle: "card" | "list";
  user?: User;
  setListStyle: (style: "card" | "list") => void;
  setUser: (user: User) => void;
  search: string;
  setSearch: (search: string) => void;
}

const useGlobalStore = create<IGlobalStore>()(
  persist(
    (set) => ({
      listStyle: "list",
      setListStyle: (style) => {
        set({ listStyle: style });
        setUserSettings("todoListViewTyp", style);
      },
      setUser: (user) => set({ user: user }),
      search: "",
      setSearch: (s) => set({ search: s }),
    }),
    {
      name: "globalstore",
    },
  ),
);

export default useGlobalStore;
