import { Router } from "express";
import { FichaController } from "./controller";

export class FichaRoutes {

    static get routes(): Router {

        const router = Router();
        const fichaController = new FichaController();

        router.get('/:rut', fichaController.getFichaByRut);
        router.get('/:fechaInicio/:fechaFin', fichaController.getFichaProxControl);
        router.post('/', fichaController.createFicha);
        router.put('/:rut', fichaController.updateFicha);
        router.delete('/:rut', fichaController.deleteFicha);

        return router;

    }

}