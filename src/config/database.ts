import { Sequelize } from "sequelize";
import config from "./index";

const sequelize = new Sequelize(
  config.db.database, // Database name
  config.db.user, // Database user
  config.db.password, // Database password
  {
    host: config.db.host,
    port: Number(config.db.port),
    dialect: "mysql", // Use "mysql" for MySQL
    logging: false, // Disable logging (optional)
  }
);

// Synchronize models with the database
(async () => {
  try {
    await sequelize.sync({ alter: true }); // Use { force: true } for development to drop and recreate tables
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
})();

export default sequelize;
