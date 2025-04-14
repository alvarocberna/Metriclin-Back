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
            const result = await connection.execute(`SELECT nro_evaluacion, fecha_evaluacion, descripcion_eva, peso, talla,
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
            const result = await connection.execute(`SELECT nro_evaluacion, fecha_evaluacion, descripcion_eva, peso, talla,
                                                     pli_bicipital, pli_tricipital, pli_subescapular, pli_cresta_iliaca,
                                                     pli_espina_iliaca, pli_abdominal, pli_muslo, pli_pantorrilla,
                                                     per_brazo, per_brazo_flex, per_cintura, per_cadera, per_muslo,
                                                     per_pantorrilla, diametro_humero, diametro_muñeca, diametro_femur,
                                                     cod_imc, cod_grasa_corporal, cod_masa_muscular
                                                    FROM EVALUACION WHERE rut = ${rut} AND nro_evaluacion = ${nroEva}`);
            res.json(result.rows[0]);
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


    public createEvaluacion = async (req: Request, res: Response) => {
        //definir variables
        const rut = req.params.rut;
        const { fecha_evaluacion, descripcion_eva, peso, talla,
            pli_bicipital, pli_tricipital, pli_subescapular, pli_cresta_iliaca,
            pli_espina_iliaca, pli_abdominal, pli_muslo, pli_pantorrilla,
            per_brazo, per_brazo_flex, per_cintura, per_cadera, per_muslo,
            per_pantorrilla, diametro_humero, diametro_muñeca, diametro_femur,
            cod_imc, cod_grasa_corporal, cod_masa_muscular } = req.body;
        let nro_evaluacion: number = 0;
        let connection;

        //generar conexion
        try {
            connection = await this.db.connection();
        } catch (err) {
            res.status(500).send('Error al conectar con la bbdd: ' + err);
            return;
        }


        //validaciones
        if (!rut || rut.trim() === '') {
            res.status(400).json({ error: 'El rut no puede estar vacío' });
            console.log('el rut no puede estar vacío');
            return;
        }
        const rutdb = await connection.execute(`SELECT rut FROM FICHA_CLINICA WHERE rut = ${rut}`)
        if (rutdb.rows.length === 0) {
            console.log('el rut no existe, no se puede crear una nueva evaluación asosiada a este rut')
            res.json('el rut no existe, no se puede crear una nueva evaluación asosiada a este rut')
            return;
        }
        if (rutdb.rows[0]) {
            console.log('el rut existe: ' + rutdb.rows[0]);
        }

        //definir nro_evaluacion
        const result = await connection.execute(`SELECT COUNT(rut) FROM EVALUACION WHERE rut = ${rut}`)
        nro_evaluacion = result.rows[0][0] + 1;

        //insertando datos
        try {
            // console.log(nro_evaluacion)
            await connection.execute(`INSERT INTO EVALUACION VALUES(
                '${rut}',
                ${nro_evaluacion},
                TO_DATE('${fecha_evaluacion}', 'DD_MM_YYYY'),
                '${descripcion_eva}',
                ${peso},
                ${talla},
                ${pli_bicipital},
                ${pli_tricipital},
                ${pli_subescapular},
                ${pli_cresta_iliaca},
                ${pli_espina_iliaca},
                ${pli_abdominal},
                ${pli_muslo},
                ${pli_pantorrilla},
                ${per_brazo},
                ${per_brazo_flex},
                ${per_cintura},
                ${per_cadera},
                ${per_muslo},
                ${per_pantorrilla},
                ${diametro_humero},
                ${diametro_muñeca},
                ${diametro_femur},
                ${cod_imc},
                ${cod_grasa_corporal},
                ${cod_masa_muscular}  )`);
            await connection.commit();
            res.json(`evaluación nro ${nro_evaluacion} creada`);
        } catch (error) {
            console.error('error, evaluación no creada:' + error);
            res.status(500).send('Error en la creacion de evaluacion: ' + error);
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

    };


    public updateEvaluacion = async (req: Request, res: Response) => {
        //definir variables
        const rut = req.params.rut;
        const nroEv: number = +req.params.nro;
        const { fecha_evaluacion, descripcion_eva, peso, talla,
            pli_bicipital, pli_tricipital, pli_subescapular, pli_cresta_iliaca,
            pli_espina_iliaca, pli_abdominal, pli_muslo, pli_pantorrilla,
            per_brazo, per_brazo_flex, per_cintura, per_cadera, per_muslo,
            per_pantorrilla, diametro_humero, diametro_muñeca, diametro_femur,
            cod_imc, cod_grasa_corporal, cod_masa_muscular } = req.body;
        let connection;

        //generar conexion
        try {
            connection = await this.db.connection();
        } catch (err) {
            res.status(500).send('Error al conectar con la bbdd: ' + err);
            return;
        }

        //validaciones
        if (!rut || rut.trim() === '') {
            res.status(400).json({ error: 'El rut no puede estar vacío' });
            console.log('el rut no puede estar vacío');
            return;
        }
        if (isNaN(nroEv)) {
            console.log('numero de evaluación no valido');
            res.json('numero de evaluación no valido');
            return;
        }
        const rutdb = await connection.execute(`SELECT rut FROM EVALUACION WHERE rut = ${rut}`)
        if (rutdb.rows.length === 0) {
            console.log('el rut no existe, no se puede modificar una nueva evaluación asosiada a este rut')
            res.json('el rut no existe, no se puede modificar una nueva evaluación asosiada a este rut')
            return;
        }

        //modificar datos
        try {
            await connection.execute(`
                UPDATE EVALUACION
                    SET fecha_evaluacion = TO_DATE('${fecha_evaluacion}', 'DD_MM_YYYY'),
                    descripcion_eva = '${descripcion_eva}',
                    peso = ${peso},
                    talla = ${talla},
                    pli_bicipital = ${pli_bicipital},
                    pli_tricipital = ${pli_tricipital},
                    pli_subescapular = ${pli_subescapular},
                    pli_cresta_iliaca = ${pli_cresta_iliaca},
                    pli_espina_iliaca = ${pli_espina_iliaca},
                    pli_abdominal = ${pli_abdominal},
                    pli_muslo = ${pli_muslo},
                    pli_pantorrilla = ${pli_pantorrilla},
                    per_brazo = ${per_brazo},
                    per_brazo_flex = ${per_brazo_flex},
                    per_cintura = ${per_cintura},
                    per_cadera = ${per_cadera},
                    per_muslo = ${per_muslo},
                    per_pantorrilla = ${per_pantorrilla},
                    diametro_humero = ${diametro_humero},
                    diametro_muñeca = ${diametro_muñeca},
                    diametro_femur = ${diametro_femur}
                WHERE rut = '${rut}' AND nro_evaluacion = ${nroEv}`);
            await connection.commit();
            res.json(`evaluación modificada`);
        } catch (error) {
            console.error('error, evaluación no modificada:' + error);
            res.status(500).send('Error en la modificación de evaluacion: ' + error);
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

    };


    public deleteEvaluacion = async (req: Request, res: Response) => {
        //definir variables
        const rut = req.params.rut;
        const nroEv: number = +req.params.nro;
        let connection;

        //generar conexion
        try {
            connection = await this.db.connection();
        } catch (err) {
            res.status(500).send('Error al conectar con la bbdd: ' + err);
            return;
        }

        //validaciones
        if (!rut || rut.trim() === '') {
            res.status(400).json({ error: 'El rut no puede estar vacío' });
            console.log('el rut no puede estar vacío');
            return;
        }
        if (isNaN(nroEv)) {
            console.log('numero de evaluación no valido');
            res.json('numero de evaluación no valido');
            return;
        }
        const rutdb = await connection.execute(`SELECT rut FROM EVALUACION WHERE rut = ${rut}`)
        if (rutdb.rows.length === 0) {
            console.log('el rut no existe, no se puede eliminar una evaluación asosiada a este rut')
            res.json('el rut no existe, no se puede eliminar una evaluación asosiada a este rut')
            return;
        }

        //eliminar datos
        try {
            await connection.execute(`DELETE FROM EVALUACION WHERE rut = '${rut}' AND nro_evaluacion = ${nroEv}`);
            await connection.commit();
            res.json(`evaluación eliminada`);
        } catch (error) {
            console.error('error, evaluación no eliminada:' + error);
            res.status(500).send('Error en la eliminación de evaluacion: ' + error);
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

    };




}