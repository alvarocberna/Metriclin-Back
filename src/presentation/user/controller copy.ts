import { Request, Response } from "express";
import { OracleDBService } from "../../infrastructure/oracledb";

// const usuarios = [
//     { rut: '15123123', dv_rut: 'K', nombre: 'Pedro', ap_paterno: 'Pascal', ap_materno: 'Perez' },
//     { rut: '16123123', dv_rut: 'K', nombre: 'Jorge', ap_paterno: 'Gonzalez', ap_materno: 'Silva' }
// ]

export class UserController {

    db = new OracleDBService();
    connection = this.db.connection();

    constructor() { }

    public getUsers = async (req: Request, res: Response) => {
        const connect = await this.connection;
        const users = await connect.execute(`SELECT rut, nombre, ap_paterno, ap_materno, fecha_nac, correo, num_celular  
            FROM USUARIO`);
        if (users) {
            res.json(users.rows);
        } else {
            res.status(404).json({ error: `No users found` });
        }
        // await connect.close();
        return;
    }

    public getUserByRut = async (req: Request, res: Response) => {
        const rut = req.params.rut;
        const connect = await this.connection;
        let user = [];

        try {
            user = await connect.execute(`SELECT rut, nombre, ap_paterno, ap_materno, fecha_nac, correo, num_celular  
                FROM USUARIO WHERE rut = ${rut}`);
        } catch (error) {
            console.error('Error executing query:', error);
        }

        if (user.rows.length === 0) {
            res.status(404).json({ error: `User with rut ${rut} not found` });
        } else {
            res.json(user.rows[0])
        }
        // await connect.close();
        return;
    }

}