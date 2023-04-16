import { NextApiRequest, NextApiResponse } from "next";
import { updateTextFile } from "@lib/utils";

type Req = NextApiRequest & {
  body: {
    text: string;
  };
};

const main = async ({ body }: Req, res: NextApiResponse) => {
  // TODO: perform permission checks here

  // get text from request
  let text = body?.text;

  if (!text) {
    res.status(400).send("Missing text");
  }

  text = JSON.stringify(text, null, 2);
  text = Buffer.from(text).toString("base64");
  const username = "username"; // TODO: get username from session

  await updateTextFile({ text, username });

  res.status(200).send({
    success: true,
  });
};

export default main;
