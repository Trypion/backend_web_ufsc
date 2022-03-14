import { NotFoundError, EmailNotAvailableError } from "../domain/user";

class UserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  async create({ name, email, password }) {
    const persistedUser = await this.UserRepository.findOne({ email });

    if (persistedUser) {
      throw new EmailNotAvailableError(`User with email ${email} already exists`);
    }

    const user = await this.UserRepository.create({ name, email, password });

    return user;
  }

  async update({ id, name, email, password }) {
    const persistedUser = await this.UserRepository.findOne({ id });

    if (!persistedUser) {
      throw new NotFoundError(`User with email ${email} not found`);
    }

    return this.UserRepository.update(id, { name, email, password });
  }

  async findOne({ id }) {
    const user = await this.UserRepository.findOne({ _id: id });

    if (!user) {
      throw new NotFoundError(`User not found`);
    }

    return (({ password, ...persistedUser }) => persistedUser)(user.toJSON());
  }

  async search(filters, pagination) {
    const { page = 1, size = 50, sortBy = "name", sortDirection = 1 } = pagination;
    const { users, count, range, total } = await this.UserRepository.search(
      filters,
      parseInt(page, 10),
      parseInt(size, 10),
      sortBy,
      sortDirection
    );

    return { users, count, range, total };
  }

  async delete({ id }) {
    const user = await this.UserRepository.findOne({ _id: id });

    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    return user.remove();
  }
}

export default UserService;
