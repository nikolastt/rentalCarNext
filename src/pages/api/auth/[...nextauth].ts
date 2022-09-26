import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_CLIENT_ID_GITHUB,
      clientSecret: process.env.NEXT_CLIENT_SECRET_GITHUB,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_CLIENT_ID_GOOGLE || "",
      clientSecret: process.env.NEXT_CLIENT_SECRET_GOOGLE || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXT_SECRET,
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        id: token.sub,
      };
    },
  },
};

export default NextAuth(authOptions);
