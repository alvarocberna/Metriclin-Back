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


    public createUser = async (req: Request, res: Response) => {
        //definir variables
        const { rut, dv_rut, nombre, ap_paterno, ap_materno, fecha_nac, password,
            correo, num_celular, cod_rol } = req.body;
        const cod_comuna: number = 1;
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
        const rutdb = await connection.execute(`SELECT rut FROM USUARIO WHERE rut = ${rut}`)
        if (rutdb.rows.length === 0) {
            console.log('rut disponible: no existen usuarios con este rut');
        }
        if (rutdb.rows[0]) {
            console.log('Ya existe un usuario con este rut ' + rutdb.rows[0]);
            res.json('Ya existe un usuario con este rut')
            return;
        }

        //insertando datos
        try {
            await connection.execute(`
                INSERT INTO USUARIO VALUES( '${rut}',
                '${dv_rut}', 
                '${nombre}',
                '${ap_paterno}',
                '${ap_materno}', 
                TO_DATE('${fecha_nac}', 'DD_MM_YYYY'),
                '${password}', 
                '${correo}',
                ${num_celular},
                ${cod_rol},
                ${cod_comuna})`);
            await connection.commit();
            console.log('usuario creado: ' + rut);
            res.json('Usuario creado: ' + rut);
        } catch (error) {
            console.error('error, usuario no creado:' + error);
            res.status(500).send('Error en la creacion de usuario: ' + error);
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

    public updateUser = async (req: Request, res: Response) => {
        //definir variables
        const rut = req.params.rut;
        const { nombre, ap_paterno, ap_materno, fecha_nac, password,
            correo, num_celular } = req.body;
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

        //actualizar datos
        try {
            await connection.execute(`
                UPDATE USUARIO 
                    SET nombre = '${nombre}',
                    ap_paterno = '${ap_paterno}',
                    ap_materno = '${ap_materno}', 
                    fecha_nac = TO_DATE('${fecha_nac}', 'DD_MM_YYYY'),
                    contraseña = '${password}', 
                    correo = '${correo}',
                    num_celular = ${num_celular}
                WHERE rut = ${rut}`);
            await connection.commit();
            console.log('usuario ' + nombre + ' ' + ap_paterno + ' modificado');
            res.json('usuario ' + nombre + ' ' + ap_paterno + ' modificado');
        } catch (error) {
            console.error('error, usuario no modificado:' + error);
            res.status(500).send('Error en la modificación de usuario: ' + error);
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

    public deleteUser = async (req: Request, res: Response) => {
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

        //eliminar datos
        try {
            await connection.execute(`DELETE FROM USUARIO WHERE rut = ${rut}`);
            await connection.commit();
            console.log('usuario eliminado');
            res.json('usuario eliminado');
        } catch (error) {
            console.error('error, el usuario no se pudo eliminar' + error);
            res.status(500).send('Error, el usuario no se pudo eliminar: ' + error);
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