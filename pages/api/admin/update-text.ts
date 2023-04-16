import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const githubConfigsBase = {
  owner: "adpopescu338",
  repo: "xyz",
  path: "text.json",
};

type Req = NextApiRequest & {
  body: {
    text: string;
  };
};

const main = async ({ body }: Req, res: NextApiResponse) => {
  // TODO: perform permission checks here

  // get text from request
  let text = body?.text;
  console.log("text", text);

  if (!text) {
    res.status(400).send("Missing text");
  }

  text = JSON.stringify(text, null, 2);
  text = Buffer.from(text).toString("base64");
  const username = "username"; // TODO: get username from session

  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      ...githubConfigsBase,
    }
  ) as  {
    data: {
      sha: string;
    }
  }

  // update the file
  await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
    ...githubConfigsBase,
    message: `Update text by ${username}`,
    content: text,
    sha: data.sha,
  });

  res.status(200).send({
    success: true,
  });
};

export default main;
