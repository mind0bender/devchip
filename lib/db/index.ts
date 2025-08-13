import { ok } from "assert";
import { connect, Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

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
  if (!cached.promise) {
    cached.promise = connect(MONGO_URI, {
      bufferCommands: false,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

(
  global as unknown as {
    mongoose: {
      conn: Mongoose | null;
      promise: Promise<Mongoose> | null;
    };
  }
).mongoose = cached;
