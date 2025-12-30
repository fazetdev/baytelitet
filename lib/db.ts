import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;
if (!MONGO_URI) throw new Error("MONGO_URI environment variable is not set");

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };
if (!global.mongooseCache) global.mongooseCache = cached;

const connect = async (): Promise<typeof mongoose> => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const connectWithRetry = async (retries = 5, delay = 1000): Promise<typeof mongoose> => {
      try {
        const conn = await mongoose.connect(MONGO_URI, {
          bufferCommands: false,
          serverSelectionTimeoutMS: 5000,
          maxPoolSize: 10,
          connectTimeoutMS: 10000,
        });

        conn.connection.on("connected", () => console.log("MongoDB connected"));
        conn.connection.on("error", (err) => console.error("MongoDB error:", err));
        conn.connection.on("disconnected", () => console.warn("MongoDB disconnected"));

        return conn;
      } catch (err) {
        if (retries <= 0) throw err;
        console.warn(`MongoDB connection failed. Retrying in ${delay}ms...`);
        await new Promise(res => setTimeout(res, delay));
        return connectWithRetry(retries - 1, delay * 2);
      }
    };

    cached.promise = connectWithRetry();
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connect;
