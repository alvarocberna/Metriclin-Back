import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import oracledb from 'oracledb';
import { OracleDBService } from "../../infrastructure/oracledb";


export class AuthController {

    JWT_SECRET = 'mi_clave_ultra_secreta_123';
    db = new OracleDBService();

    constructor() { }

    public login = async (req: Request, res: Response) => {
        const { rut, password } = req.body;
        let connection;

        try {
            connection = await this.db.connection();

            const result = await connection.execute(
                `SELECT rut, pass FROM usuario WHERE rut = :rut`,
                [rut],
                { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );

            if (!result.rows || result.rows.length === 0) {
                res.status(401).json({ message: 'Usuario no encontrado' });
                return;
            }

            const user = result.rows[0];
            let isValid = false;
            if (password === user.PASS) {
                isValid = true;
            }
            // const isValid = await bcrypt.compare(password, user.pass);

            if (!isValid) {
                res.status(401).json({ message: 'Contraseña incorrecta' });
                return;
            }

            console.log('usuario autenticado');
            const token = jwt.sign({ username: user.RUT }, this.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });


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
