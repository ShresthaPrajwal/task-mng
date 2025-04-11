import "express";

declare module "express" {
  export interface Request {
    user?: any; // You can replace `any` with a specific type if you know the structure of `decoded`
  }
}
