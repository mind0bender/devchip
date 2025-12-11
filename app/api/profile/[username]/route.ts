import { NextRequest, NextResponse } from "next/server";
import User, { UserType } from "../../../../db/models/user";
import generateProfileSVG, { generateUserDoesNotExist } from "./generator";
import { connectDB } from "../../../../lib/db";
import { cache } from "react";
import fetchUserByUsername from "./fetch";

interface RouteParams {
  username: string;
}

const getProfileCard: (username: string) => Promise<string> = cache(
  async (username: string): Promise<string> => {
    try {
      await connectDB();
      // also start a user update while updating in background.
      console.log("Starting background fetch for ", username);
      try {
        console.log(`Fetching user ${username} in background`);
        fetchUserByUsername(username);
      } catch (e: unknown) {
        // if (e instanceof Error) console.error("lol");
      }
      try {
        const user: UserType | null = await User.findOne({
          username,
        });
        if (!user) throw Error("User not found");
        if (user.commit_count < 0) {
          // user does not exist
          return generateUserDoesNotExist(username);
        }
        const profileCard: string = await generateProfileSVG(user);
        return profileCard;
      } catch (e: unknown) {
        console.error(e);
        throw new Error("Unable to fetch User from DB");
      }
    } catch (e: unknown) {
      throw e;
    }
  }
);

export async function GET(
  _req: NextRequest,
  {
    params,
  }: {
    params: Promise<RouteParams>;
  }
): Promise<NextResponse> {
  const username: string = (await params).username;
  try {
    const svg: string = await getProfileCard(username);

    // regenerate every 60s.
    // If stale, serve old while refreshing in background.
    return new NextResponse(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Content-Security-Policy": "img-src data: *;",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return new NextResponse(e.message, {
        status: 404,
      });
    } else {
      return new NextResponse("Unknown Server Error", {
        status: 500,
      });
    }
  }
}
