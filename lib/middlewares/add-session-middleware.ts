import { getSession } from "next-auth/react";

export const addSessionMiddleware = async (req, res, next) => {
  const session = await getSession({ req });

  if (session?.user) {
    Object.defineProperty(req, "session", { value: session, enumerable: true });
  }

  next();
};
