import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // 👈 add UUID
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string; // 👈 include id on User type too
  }
}
