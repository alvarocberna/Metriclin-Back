import { Router } from "express";
import { EvaluacionController } from "./controller";

export class EvaluacionRoutes {

    static get routes(): Router {

        const router = Router();
        const evaluacionController = new EvaluacionController();

        router.get('/:rut', evaluacionController.getEvaByRut);
        router.get('/all/:rut', evaluacionController.getEvaByRutAll);
        router.get('/:rut/:nro', evaluacionController.getEvaByNroAndRut);
        router.post('/:rut', evaluacionController.createEvaluacion);
        router.put('/:rut/:nro', evaluacionController.updateEvaluacion);
        router.delete('/:rut/:nro', evaluacionController.deleteEvaluacion);
        router.delete('/:rut', evaluacionController.deleteEvaluaciones);

        return router;

    }

}