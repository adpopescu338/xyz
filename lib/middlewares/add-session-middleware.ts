import { NextApiRequest, NextApiResponse } from "next";
//import { getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";

export const addSessionMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next
) => {
  let session;

  try {
    session = await getSession({ req });
  } catch (e) {
    // ignore
  }

  if (session) {
    Object.defineProperty(req, "session", { value: session, enumerable: true });
  }

  next();
};
