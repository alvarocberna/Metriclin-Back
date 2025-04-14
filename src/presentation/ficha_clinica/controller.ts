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

    public createFicha = async (req: Request, res: Response) => {
        //definir variables
        const { rut, descripcion, diagnostico, objetivo, tratamiento, fecha_ingreso, fecha_prox_sesion } = req.body;
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
            console.log('al parecer el NO rut existe')
        }
        if (rutdb.rows[0]) {
            console.log('el rut existe: ' + rutdb.rows[0]);
            res.json('el rut ya existe')
            return;
        }

        //insertando datos
        try {
            await connection.execute(`
                INSERT INTO FICHA_CLINICA VALUES( '${rut}', '${descripcion}', '${diagnostico}', '${objetivo}',
                 '${tratamiento}', TO_DATE('${fecha_ingreso}', 'DD-MM-YYYY'), TO_DATE('${fecha_prox_sesion}', 'DD_MM_YYYY'))`);
            await connection.commit();
            res.json('ficha creada');
        } catch (error) {
            console.error('error, ficha no creada:' + error);
            res.status(500).send('Error en la creacion de ficha: ' + error);
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

    public updateFicha = async (req: Request, res: Response) => {
        //definir variables
        const rut = req.params.rut;
        const { descripcion, diagnostico, objetivo, tratamiento, fecha_ingreso, fecha_prox_sesion } = req.body;
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
            console.log('No se pueden actualizar los datos ya que el NO rut existe');
            res.json('No se pueden actualizar los datos ya que el rut NO existe')
            return;
        }

        //actualizar datos
        try {
            await connection.execute(`
                UPDATE FICHA_CLINICA  
                    SET descripcion_paciente = '${descripcion}',
                    diagnostico = '${diagnostico}',
                    objetivo = '${objetivo}',
                    tratamiento = '${tratamiento}', 
                    fecha_ingreso = TO_DATE('${fecha_ingreso}', 'DD_MM_YYYY'),
                    fecha_prox_sesion = TO_DATE('${fecha_prox_sesion}', 'DD_MM_YYYY')
                WHERE rut = '${rut}'`);
            await connection.commit();
            res.json('ficha modificada');
        } catch (error) {
            console.error('error, ficha no modificada:' + error);
            res.status(500).send('Error en la modificación de ficha: ' + error);
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


    public deleteFicha = async (req: Request, res: Response) => {
        //definir variables
        const rut = req.params.rut;
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
            console.log('No se pueden eliminar los datos ya que el NO rut existe');
            res.json('No se pueden eliminar los datos ya que el rut NO existe')
            return;
        }

        //eliminar datos
        try {
            await connection.execute(`DELETE FROM FICHA_CLINICA WHERE rut = '${rut}'`);
            await connection.commit();
            res.json('ficha eliminada');
        } catch (error) {
            console.error('error, ficha no eliminada:' + error);
            res.status(500).send('Error en la eliminación de ficha: ' + error);
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