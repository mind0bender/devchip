import type { NextRequest } from "next/server";

export async function GET(req: NextRequest): Promise<Response> {
  return new Response(
    `
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <circle cx="50" cy="50" r="40" fill="red" />
</svg>
`,
    {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Content-Security-Policy": "img-src data: *;",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store",
      },
    }
  );
}
