import { Request, Response } from "express";
import { OracleDBService } from "../../infrastructure/oracledb";

export class EvaluacionController {

    db = new OracleDBService();

    constructor() { }

    public getEvaByRut = async (req: Request, res: Response) => {
        const rut = req.params.rut;
        let connection;
        try {
            connection = await this.db.connection();
            const result = await connection.execute(`SELECT fecha_evaluacion, descripcion_eva, peso, talla,
                                                     pli_bicipital, pli_tricipital, pli_subescapular, pli_cresta_iliaca,
                                                     pli_espina_iliaca, pli_abdominal, pli_muslo, pli_pantorrilla,
                                                     per_brazo, per_brazo_flex, per_cintura, per_cadera, per_muslo,
                                                     per_pantorrilla, diametro_humero, diametro_muñeca, diametro_femur,
                                                     cod_imc, cod_grasa_corporal, cod_masa_muscular
                                                    FROM EVALUACION WHERE rut = ${rut}`);
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


    public getEvaByNroAndRut = async (req: Request, res: Response) => {
        const rut = req.params.rut;
        const nroEva = req.params.nro;
        let connection;
        try {
            connection = await this.db.connection();
            const result = await connection.execute(`SELECT fecha_evaluacion, descripcion_eva, peso, talla,
                                                     pli_bicipital, pli_tricipital, pli_subescapular, pli_cresta_iliaca,
                                                     pli_espina_iliaca, pli_abdominal, pli_muslo, pli_pantorrilla,
                                                     per_brazo, per_brazo_flex, per_cintura, per_cadera, per_muslo,
                                                     per_pantorrilla, diametro_humero, diametro_muñeca, diametro_femur,
                                                     cod_imc, cod_grasa_corporal, cod_masa_muscular
                                                    FROM EVALUACION WHERE rut = ${rut} AND nro_evaluacion = ${nroEva}`);
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