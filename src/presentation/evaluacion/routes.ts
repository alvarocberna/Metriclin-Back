import { Router } from "express";
import { EvaluacionController } from "./controller";

export class EvaluacionRoutes {

    static get routes(): Router {

        const router = Router();
        const evaluacionController = new EvaluacionController();

        router.get('/:rut', evaluacionController.getEvaByRut);
        router.get('/:rut/:nro', evaluacionController.getEvaByNroAndRut);

        return router;

    }

}