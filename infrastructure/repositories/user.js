import BaseRepository from "./base";

class UserRepository extends BaseRepository {
  constructor(schema) {
    super("User", schema);
  }
}

export default UserRepository;
