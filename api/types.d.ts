export interface Repo {
  owner: {
    login: string;
  };
  stargazers_count: number;
  name: string;
}

export {};

declare global {
  var mongoose: {
    conn: typeof import("mongoose") | null;
    promise: Promise<typeof import("mongoose")> | null;
  };
}
