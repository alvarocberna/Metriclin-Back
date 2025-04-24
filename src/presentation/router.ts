import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { FichaRoutes } from "./ficha_clinica/routes";
import { EvaluacionRoutes } from "./evaluacion/routes";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/user', UserRoutes.routes);
        router.use('/api/ficha', FichaRoutes.routes);
        router.use('/api/evaluacion', EvaluacionRoutes.routes);
        router.use('/api/login', AuthRoutes.routes);

        return router;

    }

}