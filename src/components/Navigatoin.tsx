import { useRouter } from "next/router";
import Link from "./UI/Link";

export default function Navigation() {
  let route = useRouter();
  console.log("Path: ", route.pathname);
  return (
    <nav className="ml-4 flex list-none gap-4 text-2xl">
      <li>
        <Link href="#">Lorem</Link>
      </li>
      <li>
        <Link href="#">Velit</Link>
      </li>
      <li>
        <Link href="#">Voluptas</Link>
      </li>
    </nav>
  );
}
