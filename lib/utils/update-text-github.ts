import { Octokit } from "@octokit/rest";
import { TEXT_FILE_PATH } from "@constants";
import simpleGit from "simple-git";

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
  text: string; // base64 encoded
  username: string;
};
export const updateTextFile = async ({ text, username }: Args) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const gitConfigs = await githubConfigsBase();

  const { data } = (await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    gitConfigs
  )) as {
    data: {
      sha: string;
    };
  };

  // update the file
  const res = await octokit.repos.createOrUpdateFileContents({
    ...gitConfigs,
    message: `Update text by ${username}`,
    content: text,
    sha: data.sha,
  });

  // pull the changes if local
  await stashAndPullAndPop(gitConfigs.branch);

  return res;
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

const stashAndPullAndPop = async (branch?: string) => {
  if (process.env.VERCEL) {
    // no need to do this on vercel
    return;
  }
  // stash, pull, pop to update local
  const git = simpleGit();

  await git.stash();
  console.log("stashed!!!!");
  await git.pull("origin", branch);
  console.log("pulled!!!!");
  await git.stash(["pop"]);
  console.log("popped!!!!");
};
