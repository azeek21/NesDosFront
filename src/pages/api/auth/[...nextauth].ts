import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import axios from "axios";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "user@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        console.log("authorization: ", credentials);
        const user = await axios.post(
          process.env.NEXT_PUBLIC_BASE_URL + "/auth/login",
          JSON.stringify(credentials),
        );
        if (user) {
          return user.data;
        }
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
