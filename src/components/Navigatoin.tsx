import { useRouter } from "next/router";
import Button from "./UI/Button";
import { FormatListBulleted, Dashboard } from "@mui/icons-material";
import axios from "axios";
import { flushSync } from "react-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUserSettingByKey, setUserSettings } from "@/lib/fetchers";

interface InavigationProps {
  initialStyle: "card" | "list";
}

export default function Navigation({ initialStyle }: InavigationProps) {
  const queryClient = useQueryClient();
  let {
    data: listStyle,
    isLoading,
    isError,
  } = useQuery(
    ["listStyle"],
    () => {
      return getUserSettingByKey("listViewStyle");
    },
    {
      initialData: initialStyle,
    },
  );

  let route = useRouter();
  async function logOut() {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL + "auth/logout",
      "",
      { withCredentials: true },
    );
    if (res.data) {
      route.replace("/login");
    }
  }

  const mutate = useMutation({
    mutationFn: async (style: "card" | "list") => {
      if (style == listStyle) {
        return;
      }
      queryClient.setQueryData("listStyle", () => {
        return style;
      });
      return setUserSettings("listViewStyle", style);
    },
  });

  return (
    <nav className="ml-4 flex list-none items-center gap-4 text-2xl">
      <li>
        <div className="flex items-center rounded-md border border-neutral-600 py-1 text-base">
          <Button className="border-none" onClick={() => mutate.mutate("list")}>
            <FormatListBulleted
              color={listStyle === "list" ? "primary" : undefined}
            />
          </Button>
          <Button
            className="border-none"
            onClick={() => {
              mutate.mutate("card");
            }}
          >
            <Dashboard color={listStyle === "card" ? "primary" : undefined} />
          </Button>
        </div>
      </li>

      <li>
        <Button
          className="text-sm"
          onClick={() => {
            logOut();
          }}
        >
          Log Out
        </Button>
      </li>
    </nav>
  );
}
