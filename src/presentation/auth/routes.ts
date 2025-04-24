import { Router } from "express";
import { AuthController } from "./controller";

export class AuthRoutes {

    static get routes(): Router {

        const router = Router();
        const authController = new AuthController();

        router.post('/', authController.login);

        return router;

    }

}