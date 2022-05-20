import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Task {
  @PrimaryKey()
  id!: number;

  @Property({ type: "date" })
  createdAt?: Date = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @Property()
  title!: string;

  @Property({ type: "text", nullable: true })
  description?: string;
}
