import { NextApiRequest, NextApiResponse } from "next";
import { updateTextFile } from "@lib/utils";
import set from "lodash/set";
import { getText } from "@lib";

type Req = NextApiRequest & {
  body: {
    text: string;
    path: string;
  };
};

const main = async ({ body }: Req, res: NextApiResponse) => {
  // TODO: perform permission checks here

  // get text from request
  let { text, path } = body;

  if (!path) {
    res.status(400).send("Missing path");
  }

  if (!text) {
    res.status(400).send("Missing text");
  }

  const textFileContent = getText();

  set(textFileContent, path, text);

  const newFileContent = JSON.stringify(textFileContent, null, 2);
  const base64File = Buffer.from(newFileContent).toString("base64");

  const username = "username"; // TODO: get username from session

  await updateTextFile({ text: base64File, username });

  res.status(200).send({
    success: true,
  });
};

export default main;
