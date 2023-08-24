import { useRouter } from "next/router";
import Button from "./UI/Button";
import { FormatListBulleted, Dashboard } from "@mui/icons-material";
import { useState } from "react";
import useGlobalStore from "@/store";
import axios from "axios";
import { flushSync } from "react-dom";

export default function Navigation() {
  const [listStyle, setListStyle] = useGlobalStore((state) => [
    state.listStyle,
    state.setListStyle,
  ]);
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

  function changeViewStyle(style: "card" | "list") {
    if (style == listStyle) {
      return;
    }
    if (document?.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          setListStyle(style);
        });
      });
    } else {
      setListStyle(style);
    }
  }

  return (
    <nav className="ml-4 flex list-none items-center gap-4 text-2xl">
      <li>
        <div className="flex items-center rounded-md border border-neutral-600 py-1 text-base">
          <Button
            className="border-none"
            onClick={() => changeViewStyle("list")}
          >
            <FormatListBulleted
              color={listStyle === "list" ? "primary" : undefined}
            />
          </Button>
          <Button
            className="border-none"
            onClick={() => {
              changeViewStyle("card");
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
