import Button from "@/components/UI/Button";
import Input from "@/components/UI/Inpute";
import Link from "@/components/UI/Link";
import { useState, ChangeEvent } from "react";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
  });

  function handleChange(ev: ChangeEvent<HTMLInputElement>) {
    const name = ev.target.name;
    const value = ev.target.value;
    if (!name) {
      return;
    }
    setCredentials((old) => ({ ...old, [name]: value }));
  }

  return (
    <div className="flex h-screen w-screen">
      <form className="m-auto flex flex-col  gap-4 rounded-2xl border px-16 py-8 shadow-lg shadow-neutral-600 sm:w-max md:w-1/2 xl:w-2/5 2xl:w-1/3">
        <h1 className="text-center text-3xl">Welcome aboard 😄</h1>
        <Input
          type="text"
          title="Name"
          placeholder=""
          name="name"
          value={credentials.name}
          onChange={handleChange}
          autoComplete="name"
        />
        <Input
          type="text"
          title="Email"
          placeholder=""
          name="email"
          value={credentials.email}
          onChange={handleChange}
          autoComplete="email"
        />

        <Input
          type="password"
          title="Password"
          name="password"
          placeholder=""
          value={credentials.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <Button loading>Sign Up</Button>
        <span className="self-end">
          Already have an account ? <Link href="/login">Log in now</Link>
        </span>
      </form>
    </div>
  );
}
