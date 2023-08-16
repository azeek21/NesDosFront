async function logIn(credentials: { email: string; password: string }) {
  const res = await (
    await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/login", {
      method: "post",
      body: JSON.stringify(credentials),
    })
  ).json();
  if (!res || !res.success) {
    return false;
  }
  return true;
}

async function signUp(credentials: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await (
    await fetch(process.env.BASE_URL + "/signup", {
      method: "post",
      body: JSON.stringify(credentials),
    })
  ).json();

  if (!res || !res.success) {
    return false;
  }
  return true;
}

async function logOut() {
  const res = await (
    await fetch(process.env.BASE_URL + "/logout", {
      method: "post",
    })
  ).json();
  return true;
}
