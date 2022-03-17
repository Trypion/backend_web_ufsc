import bcrypt from "bcrypt";

class AuthService {
  constructor(UserRepository, jwt, { audience }) {
    this.UserRepository = UserRepository;
    this.jwt = jwt;
    this.audience = audience;
  }

  async login({ email, password }) {
    const user = await this.UserRepository.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const urn = `urn:user:${user.id}`;

    const token = this.jwt.sign(urn, payload, this.audience);

    return { token };
  }
}

export default AuthService;
