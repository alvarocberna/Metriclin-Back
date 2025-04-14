import { Router } from "express";
import { UserController } from "./controller";

export class UserRoutes {

    static get routes(): Router {

        const router = Router();
        const userController = new UserController();

        router.get('/', userController.getUsers);
        router.get('/:rut', userController.getUserByRut);
        router.post('/', userController.createUser);
        router.put('/:rut', userController.updateUser);
        router.delete('/:rut', userController.deleteUser);

        return router;

    }

}