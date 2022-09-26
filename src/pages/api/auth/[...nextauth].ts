import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { firebaseConfig } from "../../../firebase/index";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_CLIENT_ID_GITHUB as string,
      clientSecret: process.env.NEXT_CLIENT_SECRET_GITHUB as string,
    }),
    GoogleProvider({
      clientId: (process.env.NEXT_CLIENT_ID_GOOGLE as string) || "",
      clientSecret: (process.env.NEXT_CLIENT_SECRET_GOOGLE as string) || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  adapter: FirestoreAdapter(firebaseConfig),
  secret: process.env.NEXT_SECRET,
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        id: user.id,
      };
    },
  },
};

export default NextAuth(authOptions);
