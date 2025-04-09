"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const oracledb_1 = require("../../infrastructure/oracledb");
// const usuarios = [
//     { rut: '15123123', dv_rut: 'K', nombre: 'Pedro', ap_paterno: 'Pascal', ap_materno: 'Perez' },
//     { rut: '16123123', dv_rut: 'K', nombre: 'Jorge', ap_paterno: 'Gonzalez', ap_materno: 'Silva' }
// ]
class UserController {
    constructor() {
        this.db = new oracledb_1.OracleDBService();
        this.connection = this.db.connection();
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const connect = yield this.connection;
            const users = yield connect.execute(`SELECT rut, nombre, ap_paterno, ap_materno, fecha_nac, correo, num_celular  
            FROM USUARIO`);
            if (users) {
                res.json(users.rows);
            }
            else {
                res.status(404).json({ error: `No users found` });
            }
            return;
        });
        this.getUserByRut = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const rut = req.params.rut;
            const connect = yield this.connection;
            let user = [];
            try {
                user = yield connect.execute(`SELECT rut, nombre, ap_paterno, ap_materno, fecha_nac, correo, num_celular  
                FROM USUARIO WHERE rut = ${rut}`);
            }
            catch (error) {
                console.error('Error executing query:', error);
            }
            if (user.rows.length === 0) {
                res.status(404).json({ error: `User with rut ${rut} not found` });
                return;
            }
            else {
                res.json(user.rows[0]);
                return;
            }
        });
    }
}
exports.UserController = UserController;
