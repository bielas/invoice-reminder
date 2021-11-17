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
        this.router.post('/login', [
            AuthMiddleware.validateRequiredUserBodyFields,
            AuthMiddleware.validateUserEmailExists,
            AuthMiddleware.validateUserPassword,
            AuthController.login
        ]);
    }
}
