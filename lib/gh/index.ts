import Github from "github-api";
export const gh = new Github({
  token: process.env.GITHUB_TOKEN,
});
