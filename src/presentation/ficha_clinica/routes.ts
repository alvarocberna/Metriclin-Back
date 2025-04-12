import { Router } from "express";
import { FichaController } from "./controller";

export class FichaRoutes {

    static get routes(): Router {

        const router = Router();
        const fichaController = new FichaController();

        router.get('/:rut', fichaController.getFichaByRut);

        return router;

    }

}