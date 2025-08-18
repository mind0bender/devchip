import { NextRequest, NextResponse } from "next/server";
import User, { UserType } from "../../../../db/models/user";
import generateProfileSVG from "./generator";
import { connectDB } from "../../../../lib/db";
import { cache } from "react";

interface RouteParams {
  username: string;
}

const getProfileCard: (username: string) => Promise<string> = cache(
  async (username: string): Promise<string> => {
    await connectDB();
    const user: UserType | null = await User.findOne({
      username,
    });
    if (!user) throw Error("User not found");
    const profileCard: string = await generateProfileSVG(user);
    return profileCard;
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
    return new NextResponse("User not found", {
      status: 404,
    });
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return new Response();
}
