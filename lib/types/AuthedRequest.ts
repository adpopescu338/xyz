import { NextApiRequest } from "next";
import { Session } from "next-auth";

export type AuthedRequest = NextApiRequest & {
  session: Session;
};
