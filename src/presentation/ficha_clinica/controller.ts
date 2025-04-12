import { Request, Response } from "express";
import { OracleDBService } from "../../infrastructure/oracledb";

export class FichaController {

    db = new OracleDBService();

    constructor() { }

    public getFichaByRut = async (req: Request, res: Response) => {
        const rut = req.params.rut;
        let connection;
        try {
            connection = await this.db.connection();
            const result = await connection.execute(`SELECT descripcion_paciente, diagnostico, objetivo, tratamiento,
                 fecha_ingreso, fecha_prox_sesion FROM FICHA_CLINICA WHERE rut = ${rut}`);
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