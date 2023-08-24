import Button from "@/components/UI/Button";
import Input from "@/components/UI/Inpute";
import Link from "@/components/UI/Link";
import { signUp } from "@/lib/auth";
import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent, use } from "react";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    repeatPassword: "",
  });
  const router = useRouter();

  function handleChange(ev: ChangeEvent<HTMLInputElement>) {
    const name = ev.target.name;
    const value = ev.target.value;
    if (!name) {
      return;
    }
    setCredentials((old) => ({ ...old, [name]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const user = await signUp(credentials);
    console.log("SUCCESS LOGIN: ", user);

    if (user) {
      router.replace("/");
    }
  }

  return (
    <div className="flex h-screen w-screen">
      <form
        className="m-auto flex flex-col  gap-4 rounded-2xl border px-16 py-8 shadow-lg shadow-neutral-600 sm:w-max md:w-1/2 xl:w-2/5 2xl:w-1/3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-3xl">Welcome aboard 😄</h1>
        <Input
          type="text"
          title="Name"
          placeholder=""
          name="name"
          value={credentials.name}
          onChange={handleChange}
          autoComplete="name"
          required
          className="px-4 py-2"
        />
        <Input
          type="text"
          title="Email"
          placeholder=""
          name="email"
          value={credentials.email}
          onChange={handleChange}
          autoComplete="email"
          required
          className="px-4 py-2"
        />

        <Input
          type="password"
          title="Password"
          name="password"
          placeholder=""
          value={credentials.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
          className="px-4 py-2"
        />
        <Input
          type="password"
          title="Repeat password"
          name="repeatPassword"
          placeholder=""
          value={credentials.repeatPassword}
          onChange={handleChange}
          autoComplete="false"
          required
          className="px-4 py-2"
        />
        <Button>Sign Up</Button>
        <span className="self-end">
          Already have an account ? <Link href="/login">Log in now</Link>
        </span>
      </form>
    </div>
  );
}
