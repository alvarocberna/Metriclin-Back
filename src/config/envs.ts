import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
    DB_USER: get('DB_USER').required().asString(),
    DB_USER_PASSWORD: get('DB_USER_PASSWORD').required().asString(),
    DB_PROTOCOL: get('DB_PROTOCOL').required().asString(),
    DB_HOST: get('DB_HOST').required().asString(),
    DB_PORT: get('DB_PORT').required().asPortNumber(),
    DB_SERVICE_NAME: get('DB_SERVICE_NAME').required().asString(),
    DB_WALLET_PASSWORD: get('DB_WALLET_PASSWORD').required().asString(),
}