import Button from "@/components/UI/Button";
import Input from "@/components/UI/Inpute";
import Link from "@/components/UI/Link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  signIn();

  function handleChange(ev: ChangeEvent<HTMLInputElement>) {
    const name = ev.target.name;
    const value = ev.target.value;
    if (!name) {
      return;
    }
    setCredentials((old) => ({ ...old, [name]: value }));
  }
  const router = useRouter();

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const success = await signIn("credentials", credentials);

    if (success) {
      router.replace("/");
    }
  }

  return (
    <div className="flex h-screen w-screen">
      <form
        className="m-auto flex flex-col  gap-4 rounded-2xl border px-16 py-8 shadow-lg shadow-neutral-600 sm:w-max md:w-1/2 xl:w-2/5 2xl:w-1/3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-3xl">Welcome back 😅</h1>
        <Input
          type="text"
          title="Email"
          placeholder="user@example.com"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <Input
          type="password"
          title="Password"
          name="password"
          placeholder="ILoveCats123"
          value={credentials.password}
          onChange={handleChange}
          autoComplete="password"
        />
        <Button>Log In</Button>
        <span className="self-end">
          No account ? <Link href="/signup">Register now</Link>
        </span>
      </form>
    </div>
  );
}
