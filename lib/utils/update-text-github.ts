import { Octokit } from "@octokit/rest";
import { TEXT_FILE_PATH } from "@constants";

const branch =
  process.env.VERCEL_GIT_COMMIT_REF ||
  (process.env.NODE_ENV === "production" ? "main" : "dev");

const githubConfigsBase = {
  owner: process.env.VERCEL_GIT_REPO_OWNER as string,
  repo: process.env.VERCEL_GIT_REPO_SLUG as string,
  path: TEXT_FILE_PATH,
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
