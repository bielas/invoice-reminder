import express from "express";
import jwt from "jsonwebtoken";
import UserController from "../../user/controller/user.controller";
import bcrypt from 'bcryptjs';
import {User} from "../../user/model/user";

class AuthMiddleware {
    validateRequiredUserBodyFields(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.body && req.body.email && req.body.password) {
            next();
        } else {
            res.status(400).send({
                error: `Missing required fields email and password`,
            });
        }
    }

    validateUserEmailExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = UserController.getUserByEmail(req.body.email);
        if (!user) {
            res.status(400).send({error: `User email does not exists`});
        } else {
            next();
        }
    }

    async validateUserPassword(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user: User | undefined = UserController.getUserByEmail(req.body.email);

        if (!user) {
            res.status(400).send({error: `User does not exists!`});
        }

        const comparedPassword = await bcrypt.compare(req.body.password, user.password!);
        if (!comparedPassword) {
            res.status(400).send({error: `User password does not match`});
        }

        next();
    }

    validateToken(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const token: string = req.get('Authorization')!

        if (!token) {
            res.status(401).send({error: `Token is not valid! User is not authorized!`});
        }

        const decodedToken: any = jwt.decode(token);

        if (!decodedToken) {
            res.status(401).send({error: `Token is not valid! User is not authorized!`});
        }

        const user = UserController.getUserByEmail(decodedToken?.email);

        if (!user) {
            res.status(401).send({error: `Token is not valid! User is not authorized!`});
        }

        next();
    }
}

export default new AuthMiddleware();
