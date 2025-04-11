import { IRepository } from "../../shared/interfaces/IRepository";
import { IUser } from "./interfaces/IUser";
import { v4 as uuidv4 } from "uuid";

export class UserRepository implements IRepository<IUser> {
  private users: IUser[] = [];

  async create(user: IUser): Promise<IUser> {
    const newUser = { ...user, id: uuidv4() }; // Generate a UUID
    this.users.push(newUser);
    return newUser;
  }

  async findById(id: string): Promise<IUser | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async findAll(): Promise<IUser[]> {
    return this.users;
  }

  async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;

    const updatedUser = { ...this.users[userIndex], ...userData };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return false;

    this.users.splice(userIndex, 1);
    return true;
  }
}
