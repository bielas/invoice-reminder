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
        /**
         * @swagger
         * /users:
         *  get:
         *    security:
         *      - bearerAuth: []
         *    tags: [Users]
         *    summary: Use to request all users
         *    responses:
         *      '200':
         *        description: A successful response
         */
        this.router.get('/', UserController.getUsers)
        /**
         * @swagger
         * /users/{id}:
         *   get:
         *     security:
         *       - bearerAuth: []
         *     tags: [Users]
         *     summary: Use to request user by ID
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         description: Character ID of the user to retrieve.
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *          description: A successful response
         *       404:
         *          description: Not found
         */
        this.router.get('/:id', UserController.getUser)
        this.router.delete('/:id', UserController.deleteUser)
        this.router.post('/', UserController.createUser)
        this.router.patch('/:id', UserController.updateUser)
    }
}
