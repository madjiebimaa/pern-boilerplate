import { MikroORM } from "@mikro-orm/core";
import { config } from "dotenv";
import express from "express";
import mikroOrmConfig from "./mikro-orm.config";

config();

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const app = express();

  app.get("/", (_, res) => {
    res.send("Hello world!");
  });

  app.listen(process.env.SERVER_PORT, () => {
    console.log("server started on localhost:" + process.env.SERVER_PORT);
  });
};

main();
