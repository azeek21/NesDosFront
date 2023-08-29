import { useRouter } from "next/router";
import Button from "./UI/Button";
import { FormatListBulleted, Dashboard } from "@mui/icons-material";
import axios from "axios";
import { flushSync } from "react-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUserSettingByKey, setUserSettings } from "@/lib/fetchers";
import { getListStyle } from "@/utils/utils";

interface InavigationProps {}

export default function Navigation({}: InavigationProps) {
  const router = useRouter();
  const style = getListStyle(router.query.style);

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

  function handleListStyleChange(newStyle: "list" | "card") {
    router.replace({
      query: { ...router.query, style: newStyle },
    });
  }

  return (
    <nav className="ml-4 flex list-none items-center gap-4 text-2xl">
      <li>
        <div className="flex items-center rounded-md border border-neutral-600 py-1 text-base">
          <Button
            className="border-none"
            onClick={() => {
              handleListStyleChange("list");
            }}
          >
            <FormatListBulleted
              color={style === "list" ? "primary" : undefined}
            />
          </Button>
          <Button
            className="border-none"
            onClick={() => {
              handleListStyleChange("card");
            }}
          >
            <Dashboard color={style === "card" ? "primary" : undefined} />
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
