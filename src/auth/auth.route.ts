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
         *     requestBody:
         *      required: true
         *      content:
         *          application/json:
         *              schema:
         *                  type: object
         *                  required:
         *                      - email
         *                      - password
         *                  properties:
         *                      email:
         *                          type: string
         *                          example: admin@mail.com
         *                      password:
         *                          type: string
         *                          example: admin
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
