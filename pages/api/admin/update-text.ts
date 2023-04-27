import { NextApiRequest, NextApiResponse } from "next";
import { updateTextFile } from "@lib/utils";
import { admin } from "@lib/middlewares";
import { Permission } from "@prisma/client";

type Req = NextApiRequest & {
  body: {
    text: string;
  };
};

const main = async ({ body }: Req, res: NextApiResponse) => {
  // get text from request
  let text = body?.text;

  if (!text) {
    res.status(400).send("Missing text");
  }

  const username = "username"; // TODO: get username from session

  await updateTextFile({ text, username });

  res.status(200).send({
    success: true,
  });
};

const handler = admin(Permission.EDIT_TEXT).post(main);

export default handler;
