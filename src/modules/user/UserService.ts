import { UserRepository } from "./UserRepository";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userData: any): Promise<any> {
    return this.userRepository.create(userData);
  }

  async findUserById(userId: string): Promise<any> {
    return this.userRepository.findById(userId);
  }

  async findUserByEmail(email: string): Promise<any> {
    return this.userRepository.findByEmail(email);
  }

  async validateUserCredentials(
    email: string,
    password: string
  ): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      // Add password validation logic here
      return true; // Placeholder for actual validation
    }
    return false;
  }
}
