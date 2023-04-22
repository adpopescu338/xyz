import { NextApiRequest, NextApiResponse } from "next";
//import { getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";

export const addSessionMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next
) => {
  console.log("getting session!!!!!!!");
  const session = await getSession({ req });

  if (session?.user) {
    Object.defineProperty(req, "session", { value: session, enumerable: true });
  }
  console.log("calling next!!!!");
  next();
};
