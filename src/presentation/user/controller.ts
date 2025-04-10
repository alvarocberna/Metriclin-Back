import { Request, Response } from "express";
import { OracleDBService } from "../../infrastructure/oracledb";

export class UserController {

    db = new OracleDBService();

    constructor() { }

    public getUsers = async (req: Request, res: Response) => {
        let connection;
        try {
            connection = await this.db.connection();
            const result = await connection.execute(`SELECT rut, nombre, ap_paterno, ap_materno, fecha_nac, correo, num_celular  
                FROM USUARIO`);
            res.json(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error en la consulta');
        } finally {
            if (connection) {
                try {
                    await connection.close();
                    console.log('Conexión cerrada');
                } catch (closeErr) {
                    console.error('Error al cerrar la conexión:', closeErr);
                }
            }

        }

    }

    public getUserByRut = async (req: Request, res: Response) => {
        const rut = req.params.rut;
        let connection;
        try {
            connection = await this.db.connection();
            const result = await connection.execute(`SELECT rut, nombre, ap_paterno, ap_materno, fecha_nac, correo, num_celular  
                FROM USUARIO WHERE rut = ${rut}`);
            res.json(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error en la consulta');
        } finally {
            if (connection) {
                try {
                    await connection.close();
                    console.log('Conexión cerrada');
                } catch (closeErr) {
                    console.error('Error al cerrar la conexión:', closeErr);
                }
            }

        }

    }

}