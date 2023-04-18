import NextAuth from "next-auth";
import { Role, Permission } from "@prisma/client";

export type User = {
  name: string;
  email: string;
  role: Role;
  id: string;
  permissions?: Permission[];
};

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: User;
  }
}
