import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string; // Append the type definition string constraint here
        } & DefaultSession["user"];
    }
}