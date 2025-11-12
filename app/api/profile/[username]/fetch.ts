import { Document } from "mongoose";
import User, { UserType } from "../../../../db/models/user";
import octo from "../../../../lib/gh";
import errorConfig from "../../../../lib/helpers/errorMap";

export default async function fetchUserByUsername(
  username: string
): Promise<Omit<UserType, keyof Document> | void> {
  try {
    const { data: octo_user } = await octo.rest.users.getByUsername({
      username,
    });

    const repos = await octo.paginate(octo.rest.repos.listForUser, {
      username,
      per_page: 100,
    });

    let totalStars: number = 0;
    let commitCount: number = 0;

    for (const repo of repos) {
      totalStars += repo.stargazers_count || 0;

      // Only count commits for repos the user owns (not forks)
      if (!repo.fork) {
        try {
          const commits = await octo.paginate(octo.rest.repos.listCommits, {
            owner: username,
            repo: repo.name,
            author: username,
            per_page: 100,
          });
          commitCount += commits.length;
        } catch (e: unknown) {
          // Skip repos with no access or large commit history
        }
      }
    }

    const query = `
    query ($login: String!) {
        user(login: $login) {
            contributionsCollection {
                contributionCalendar {
                    totalContributions
                }
              }
            }
          }
          `;

    const { user: gqlUser } = await octo.graphql<{ user: any }>(query, {
      login: username,
    });
    const totalContributions: number =
      gqlUser?.contributionsCollection?.contributionCalendar
        ?.totalContributions ?? 0;

    const user: Omit<UserType, keyof Document> = {
      username,
      name: octo_user.name || "",
      avatar_url: octo_user.avatar_url,
      commit_count: commitCount,
      created_at: new Date(octo_user.created_at),
      followers: octo_user.followers,
      html_url: octo_user.html_url,
      star_gazers_count: totalStars,
      total_repos: octo_user.public_repos,
      contribution_count: totalContributions,
    };

    try {
      const userDoc: UserType = (await User.findOneAndUpdate(
        {
          username,
        },
        user,
        {
          new: true,
          upsert: true,
        }
      )) as UserType;
      console.log(`user ${username} updated`);
      return userDoc;
    } catch (e: unknown) {
      throw new Error(errorConfig.db[500]);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      const invalidUser = {
        username,
        name: "",
        avatar_url: "",
        commit_count: -1, // indicate's the invalid user
        created_at: new Date(),
        followers: 0,
        html_url: 0,
        star_gazers_count: 0,
        total_repos: 0,
        contribution_count: 0,
      };

      try {
        const invalidUserDoc: UserType = (await User.findOneAndUpdate(
          {
            username,
          },
          invalidUser,
          {
            new: true,
            upsert: true,
          }
        )) as UserType;
        console.log(`fake user ${username} updated`);
        throw new Error(`user ${username} not found`);
      } catch (e: unknown) {
        throw new Error(errorConfig.db[500]);
      }
    }
  }
}
