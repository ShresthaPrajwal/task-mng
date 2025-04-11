import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database";

class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public userId!: number; // Foreign key to associate tasks with users
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
  }
);

export default Task;
