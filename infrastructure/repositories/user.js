import mongoose from "mongoose";

class UserRepository extends mongoose.model {
  constructor(schema) {
    super("users", schema);
  }

  async create({ name, email, password }) {
    return new this({ name, email, password });
  }
}

export default UserRepository;
