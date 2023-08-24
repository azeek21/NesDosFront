import axios from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
}

async function logIn(creds: {
  password: string;
  email: string;
}): Promise<User | null> {
  if (!creds.password || !creds.email) {
    return null;
  }
  console.log("login posting: ", creds);
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "auth/login",
    creds,
    {
      withCredentials: true,
    },
  );
  if (res.data) {
    return res.data;
  }
  return null;
}

async function signUp(creds: {
  name: string;
  email: string;
  password: string;
}): Promise<User | null> {
  if (!creds.email || !creds.name || !creds.password) {
    return null;
  }
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "auth/signup",
    creds,
    {
      withCredentials: true,
    },
  );
  if (res.data) {
    return res.data;
  }
  return null;
}

async function logOut(): Promise<boolean> {
  const resp = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + "auth/logout",
  );
  if (resp.data) {
    return true;
  }
  return false;
}

export { logIn, logOut, signUp };
