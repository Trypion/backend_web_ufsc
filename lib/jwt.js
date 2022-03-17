import jwt from "jsonwebtoken";

const ALGORITHM = "HS256";

const factory = ({ issuer, ttl, privateKey }) => ({
  sign: (subject, payload, audience) => {
    const options = {
      issuer,
      subject,
      audience,
      expiresIn: ttl,
      algorithm: ALGORITHM,
    };

    return jwt.sign(payload, privateKey, options);
  },
  verify: (token, audience) => {
    const options = {
      audience,
      algorithms: [ALGORITHM],
    };

    return jwt.verify(token, privateKey, options);
  }
});

export default { factory };
