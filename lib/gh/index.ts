import { ok } from "assert";
import { Octokit } from "octokit";
import errorConfig from "../helpers/errorMap";

const GH_TOKEN: string = process.env.GITHUB_TOKEN as string;
ok(GH_TOKEN, errorConfig.githubApi[401]);

const octo: Octokit = new Octokit({
  auth: GH_TOKEN,
});

export default octo;
