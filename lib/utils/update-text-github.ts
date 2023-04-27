import { Octokit } from "@octokit/rest";
import { TEXT_FILE_PATH } from "@constants";
import simpleGit from "simple-git";
import { writeFileSync } from "fs";

const githubConfigsBase = async () => {
  const branch = await getBranch();

  return {
    owner: process.env.VERCEL_GIT_REPO_OWNER as string,
    repo: process.env.VERCEL_GIT_REPO_SLUG as string,
    path: TEXT_FILE_PATH,
    ref: branch,
    branch: branch,
  };
};

type Args = {
  text: Record<string, any>;
  username: string;
};
export const updateTextFile = async ({
  text,
  username,
}: Args): Promise<void> => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const gitConfigs = await githubConfigsBase();

  if (!process.env.VERCEL) {
    // write the file locally
    writeFileSync(TEXT_FILE_PATH, JSON.stringify(text, null, 2), "utf8");
    return;
  }

  const { data } = (await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    gitConfigs
  )) as {
    data: {
      sha: string;
    };
  };

  let textString = JSON.stringify(text, null, 2);
  textString = Buffer.from(textString).toString("base64");

  // update the file in github
  await octokit.repos.createOrUpdateFileContents({
    ...gitConfigs,
    message: `Update text by ${username}`,
    content: textString,
    sha: data.sha,
  });

  return;
};

const getBranch = async () => {
  // populated by vercel
  if (process.env.VERCEL_GIT_COMMIT_REF) {
    return process.env.VERCEL_GIT_COMMIT_REF;
  }

  const git = simpleGit();

  const branch = await git.branch();

  return branch.current;
};
