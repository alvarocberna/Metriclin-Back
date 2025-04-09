"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    PUBLIC_PATH: (0, env_var_1.get)('PUBLIC_PATH').default('public').asString(),
    DB_USER: (0, env_var_1.get)('DB_USER').required().asString(),
    DB_USER_PASSWORD: (0, env_var_1.get)('DB_USER_PASSWORD').required().asString(),
    DB_PROTOCOL: (0, env_var_1.get)('DB_PROTOCOL').required().asString(),
    DB_HOST: (0, env_var_1.get)('DB_HOST').required().asString(),
    DB_PORT: (0, env_var_1.get)('DB_PORT').required().asPortNumber(),
    DB_SERVICE_NAME: (0, env_var_1.get)('DB_SERVICE_NAME').required().asString(),
    DB_WALLET_PASSWORD: (0, env_var_1.get)('DB_WALLET_PASSWORD').required().asString(),
};
