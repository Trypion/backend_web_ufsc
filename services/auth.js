import bcrypt from "bcrypt";

class AuthService {
  constructor(UserRepository, jwt) {
    this.UserRepository = UserRepository;
    this.jwt = jwt;
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
    const audience = `urn:app:car-rental`;

    const token = this.jwt.sign(urn, payload, audience);

    return { token };
  }
}

export default AuthService;
