import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import Controller from "./interfaces/Controller";

class App {
  public app: Application;
  private port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddleware();
    this.initializeControllers(controllers);
  }

  private initializeMiddleware() {
    this.app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
