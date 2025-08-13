import type { NextRequest } from "next/server";
import User, { UserType } from "../../../../db/models/user";
import generateProfileSVG from "./generator";
import { connectDB } from "../../../../lib/db";

interface RouteParams {
  username: string;
}

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<RouteParams>;
  }
): Promise<Response> {
  const username: string = (await params).username;
  await connectDB();
  const user: UserType | null = await User.findOne({
    username,
  });
  if (!user) {
    return new Response("not found");
  }
  const svg: string = await generateProfileSVG(user);

  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Content-Security-Policy": "img-src data: *;",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    },
  });
}
