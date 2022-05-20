import { MikroORM } from "@mikro-orm/core";
import { config } from "dotenv";
import App from "./app";
import mikroOrmConfig from "./mikro-orm.config";
import TaskController from "./task/TaskController";
import TaskRepository from "./task/TaskRepository";

config();

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const taskRepository = new TaskRepository(orm.em);

  const taskController = new TaskController(taskRepository);

  const app = new App([taskController], Number(process.env.SERVER_PORT));
  app.listen();
};

main().catch((err) => {
  console.log(err);
});
