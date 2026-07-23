import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./lib/db" // dependent on Nompilon PR
import { PasswordHasher } from "@/util"
import NeonAdapter from "@auth/neon-adapter"
import { Pool } from "@neondatabase/serverless"

// this will be moved to lib/zod folder
import { object, string } from "zod"

export const signInSchema = object({
  email: string()
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})


export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  return {
    adapter: NeonAdapter(pool),
    pages: {
      signIn: "/login",
    },
    providers: [
      Credentials({
        // this takes fields that would be used for login purpose
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
          if (!credentials?.email || !credentials?.password) return null;
          const { email, password } = await signInSchema.parseAsync(credentials)
          
          // logic to verify if the user exists
          const user = await db.user.findUnique({
            where: { email: (email as string).toLowerCase() },
          });


          if (!user || !user.password) {
            throw new Error("Invalid email or password.");
          }

          // logic to compare hash password
          const pwHash = await PasswordHasher.compare(password, user.password)

          if (!pwHash) {
            throw new Error("Invalid email or password.");
          }

          // return user object with their profile data
          return user
        },
      }),
    ],
    callbacks: {
      // false to redirect unauthenticated users to the signIn page above.
      authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user;
        const publicRoutes = ["/login", "/register"];
        const isPublic = publicRoutes.some((route) =>
          nextUrl.pathname.startsWith(route)
        );
        if (isPublic) return true;
        return isLoggedIn;
      },
      async jwt({ token, user }) {
        if (user) token.id = user.id;
        return token;
      },
      async session({ session, token }) {
        if (session.user) session.user.id = token.id as string;
        return session;
      },
    },
  }

})