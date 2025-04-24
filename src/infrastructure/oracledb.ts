
const oracledb = require('oracledb');
import { envs } from "../config/envs";

export class OracleDBService {

    cs = "tcps://adb.sa-santiago-1.oraclecloud.com:1522/" + envs.DB_SERVICE_NAME;
    connection = async () => {
        return await oracledb.getConnection({
            user: 'admin',
            password: envs.DB_USER_PASSWORD,
            connectString: this.cs,
            configDir: __dirname + `../../../wallet_db`,
            walletLocation: __dirname + `../../../wallet_db`,
            walletPassword: envs.DB_WALLET_PASSWORD,
        });
    }

}
