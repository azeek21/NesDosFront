import { useRouter } from "next/router";
import Link from "./UI/Link";
import Navigation from "./Navigatoin";
import Logo from "./Logo";
import Input from "./UI/Inpute";
import { useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");
  return (
    <header className="sticky top-0 flex items-center border-b border-b-yellow-100 px-4 py-2 backdrop-blur-sm">
      <Logo />
      <Input
        className="ml-auto"
        placeholder="Search..."
        value={search}
        onChange={(v) => setSearch(v.target.value)}
      />
      <Navigation />
    </header>
  );
}
