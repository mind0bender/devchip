import { config } from "@dotenvx/dotenvx";

config();
export const PORT: number = parseInt(process.env.PORT || "8080");
