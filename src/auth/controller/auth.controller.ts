import {Request, Response} from "express";
import jwt from "jsonwebtoken";

class AuthController {
    login(req: Request, res: Response): void {
        const {email} = req.body;

        const token = jwt.sign(
            {email: email},
            'SECRET KEY',
            {
                expiresIn: "2h",
            }
        );

        res.send({token: token});
    }
}

export default new AuthController();
