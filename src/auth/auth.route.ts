import express from "express";
import AuthController from "./controller/auth.controller";
import AuthMiddleware from "./middlewares/auth.middleware";

// const router = express.Router();
// router.post('/login', [
//     AuthMiddleware.validateRequiredUserBodyFields,
//     AuthMiddleware.validateUserEmailExists,
//     AuthMiddleware.validateUserPassword,
//     AuthController.login
// ]);
// export default router;


export default class AuthRoute {
    router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        /**
         * @swagger
         * /auth/login:
         *   post:
         *     tags: [Authorization]
         *     summary: Get token
         *     parameters:
         *       - in: body
         *         name: id
         *         required: true
         *         description: Get token
         *         schema:
         *           type: object
         *           required:
         *              - email
         *              - password
         *           properties:
         *              email:
         *                  type: string
         *              password:
         *                  type: string
         *     responses:
         *       200:
         *          description: A successful response
         */
        this.router.post('/login', [
            AuthMiddleware.validateRequiredUserBodyFields,
            AuthMiddleware.validateUserEmailExists,
            AuthMiddleware.validateUserPassword,
            AuthController.login
        ]);
    }
}
