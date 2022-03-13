import { NotFoundError } from "../domain/user";

class UserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  async create({ name, email, password }) {
    const persistedUser = await this.UserRepository.findOne({ email });

    if (persistedUser) {
      throw new NotFoundError(`User with email ${email} already exists`);
    }

    const user = await this.UserRepository.create({ name, email, password });

    return user.save();
  }
}

export default UserService;
