import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmailAndPassword } from "pages/api/auth/login";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, {
    debug: true,
    // Configure one or more authentication providers
    providers: [
      Credentials({
        name: "Credentials",
        credentials: {
          username: {
            label: "Email",
            type: "text",
            placeholder: "jsmith@example.com",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          // Add logic here to look up the user from the credentials supplied
          return await getUserByEmailAndPassword(
            credentials.username,
            credentials.password
          );
        },
      }),
    ],
    callbacks: {
      async signIn({ user, account, profile }) {
        if (profile && user && !user.name) {
          user.name = profile.name;
        }
        return !!user;
      },
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
          // @ts-expect-error
          token.role = user.role;
        }
        return token;
      },
      async session({ session, token }) {
        // @ts-expect-error
        session.user.id = token.id;

        session.user.email = token.email;

        session.user.name = token.name;
        // @ts-expect-error
        session.user.role = token.role;

        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {},
    session: {
      strategy: "jwt",
      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 30 * 24 * 60 * 60, // 30 days

      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      // Note: This option is ignored if using JSON Web Tokens
      updateAge: 24 * 60 * 60, // 24 hours
    },
    theme: {
      colorScheme: "auto", // "auto" | "dark" | "light"
      brandColor: "#4287f5", // Hex color code
      logo: `${process.env.NEXT_PUBLIC_URL}/logo.svg`, // Absolute URL to image
      buttonText: "#f542ef", // Hex color code
    },
  });
};

export default handler;
