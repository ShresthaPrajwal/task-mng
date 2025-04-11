import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || "user",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "database",
  },
  jwtSecret:
    process.env.JWT_SECRET ||
    "9c1e3f92d7454b0481a5f9eab5b62c88b1e6c9db6455e2a9530f3c68e2f827bc8aa487de3f34aa5f2bcf82f36b4d3d4e04acb5ab953a3aabf44740cf21d2c3dc",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};

export default config;
