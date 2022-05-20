import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Task } from "./Task";

class TaskRepository {
  private em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;

  constructor(
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
  ) {
    this.em = em;
  }

  public create = async (title: string, description: string) => {
    const task = this.em.create(Task, { title, description });
    return await this.em.persistAndFlush(task);
  };

  public getById = async (id: number) => {
    return await this.em.findOne(Task, { id });
  };

  public update = async (task: Task) => {
    return this.em.persistAndFlush(task!);
  };

  public delete = async (id: number) => {
    return this.em.nativeDelete(Task, { id });
  };
}

export default TaskRepository;
