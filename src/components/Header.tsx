import { useRouter } from "next/router";
import Link from "./UI/Link";
import Navigation from "./Navigatoin";
import Logo from "./Logo";
import Input from "./UI/Inpute";
import { useState } from "react";

interface IHeaderProps {
  style: "list" | "card";
}

export default function Header({ style }: IHeaderProps) {
  const [search, setSearch] = useState("");
  const route = useRouter();
  const navHidden = route.pathname == "/login" || route.pathname == "/signup";
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-b-yellow-100 px-4 py-2 backdrop-blur-sm">
      <Logo />

      <Navigation initialStyle={style} />
    </header>
  );
}
