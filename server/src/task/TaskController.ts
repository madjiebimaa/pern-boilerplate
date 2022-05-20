import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import Controller from "../interfaces/Controller";
import TaskRepository from "./TaskRepository";

class TaskController implements Controller {
  private taskRepository: TaskRepository;

  public path = "/api/tasks";
  public router = Router();

  private initializeRoutes() {
    this.router.post(this.path, this.create);
    this.router.get(this.path + "/:taskId", this.getById);
    this.router.patch(this.path + "/:taskId", this.update);
    this.router.delete(this.path + "/:taskId", this.delete);
  }

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
    this.initializeRoutes();
  }

  public create = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const task = await this.taskRepository.create(title, description);
    return res.status(StatusCodes.CREATED).json(task);
  };

  public getById = async (req: Request, res: Response) => {
    const id = Number(req.params["taskId"]);
    const task = await this.taskRepository.getById(id);

    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "the task is not found",
      });
    }

    return res.status(StatusCodes.OK).json(task);
  };

  public update = async (req: Request, res: Response) => {
    const id = Number(req.params["taskId"]);
    const task = await this.taskRepository.getById(id);

    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "the task is not found",
      });
    }

    const { title, description } = req.body;
    title ? (task.title = title) : null;
    description ? (task.description = description) : null;

    await this.taskRepository.update(task);

    return res
      .status(StatusCodes.OK)
      .json({ message: "the task already updated" });
  };

  public delete = async (req: Request, res: Response) => {
    const id = Number(req.params["taskId"]);
    const task = await this.taskRepository.getById(id);

    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "the task is not found",
      });
    }

    await this.taskRepository.delete(id);
    return res
      .status(StatusCodes.OK)
      .json({ message: "the task already deleted" });
  };
}

export default TaskController;
