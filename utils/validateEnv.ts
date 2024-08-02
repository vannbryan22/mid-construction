import { cleanEnv, port, str } from "envalid";

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    JWT_SECRET: str(),
    REFRESH_TOKEN_SECRET: str(),
    REFRESH_TOKEN_EXPIRATION: str(),
    JWT_TOKEN_EXPIRATION: str(),
  });
};

export default validateEnv;
