import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./constants";
import { Task } from "./entities/Task";

export default {
  entities: [Task],
  type: "postgresql",
  user: "user",
  password: "password",
  dbName: "database_name",
  debug: !__prod__,
  migrations: {
    path: path.join(__dirname, "./migrations"),
    glob: "!(*.d).{js,ts}",
  },
} as Parameters<typeof MikroORM.init>[0];
