import { MikroORM } from "@mikro-orm/core";
import { config } from "dotenv";
import path from "path";
import { __prod__ } from "./constants";
import { Task } from "./task/Task";

config();

export default {
  entities: [Task],
  type: "postgresql",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  debug: !__prod__,
  allowGlobalContext: true,
  migrations: {
    path: path.join(__dirname, "./migrations"),
    glob: "!(*.d).{js,ts}",
  },
} as Parameters<typeof MikroORM.init>[0];
