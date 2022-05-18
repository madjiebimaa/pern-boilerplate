import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Task } from "./entities/Task";

export default {
  entities: [Task],
  dbName: "database_name",
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
