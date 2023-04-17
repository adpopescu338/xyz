import { Octokit } from "@octokit/rest";

const branch =
  process.env.VERCEL_GIT_COMMIT_REF ||
  (process.env.NODE_ENV === "production" ? "main" : "dev");

const githubConfigsBase = {
  owner: "adpopescu338",
  repo: process.env.VERCEL_GITHUB_REPO as string,
  path: "text.json",
  ref: branch,
  branch: branch,
};

type Args = {
  text: string; // base64 encoded
  username: string;
};
export const updateTextFile = async ({ text, username }: Args) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const { data } = (await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      ...githubConfigsBase,
    }
  )) as {
    data: {
      sha: string;
    };
  };

  console.log(data);

  // update the file
  const res = await octokit.repos.createOrUpdateFileContents({
    ...githubConfigsBase,
    message: `Update text by ${username}`,
    content: text,
    sha: data.sha,
  });

  return res;
};
