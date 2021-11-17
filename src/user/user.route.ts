import UserController from "./controller/user.controller";
import express from "express";

// const router = express.Router();
// router.get('/', userController.getUsers)
// router.get('/:id', userController.getUser)
// router.delete('/:id', userController.deleteUser)
// router.post('/', userController.createUser)
// router.patch('/:id', userController.updateUser)
// export default router;


export default class UserRoute {
    router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get('/', UserController.getUsers)
        this.router.get('/:id', UserController.getUser)
        this.router.delete('/:id', UserController.deleteUser)
        this.router.post('/', UserController.createUser)
        this.router.patch('/:id', UserController.updateUser)
    }
}
