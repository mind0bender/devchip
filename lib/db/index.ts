import { ok } from "assert";
import { connect, Mongoose } from "mongoose";

const MONGO_URI: string = process.env.MONGO_URI as string;

ok(MONGO_URI, "MONGO_URI is required.");

const cached: {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
} = (
  global as unknown as {
    mongoose: { conn: Mongoose; promise: Promise<Mongoose> | null };
  }
).mongoose || {
  conn: null,
  promise: null,
};

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;
  // queries throw if db not connected
  // max pool size is 1(since serverless functions need just one connection)
  if (!cached.promise) {
    cached.promise = connect(MONGO_URI, {
      bufferCommands: false,
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
    });
  }
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e: unknown) {
    console.error(e);
    throw new Error("Unable to connect to Database.");
  }
}

(
  global as unknown as {
    mongoose: {
      conn: Mongoose | null;
      promise: Promise<Mongoose> | null;
    };
  }
).mongoose = cached;
