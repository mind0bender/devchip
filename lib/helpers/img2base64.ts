export default async function imageToBase64(url: string): Promise<string> {
  const res: Response = await fetch(url, { cache: "no-store" });
  const buffer: Buffer<ArrayBuffer> = Buffer.from(await res.arrayBuffer());
  const base64 = `data:image/png;base64,${buffer.toString("base64")}`;
  return base64;
}
