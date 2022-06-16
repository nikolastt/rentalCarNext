import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_CLIENT_ID_GITHUB,
      clientSecret: process.env.NEXT_CLIENT_SECRET_GITHUB,
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
});
