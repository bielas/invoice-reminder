import UserRouter from "./user/user.route";
import express, {Request, Response} from "express";
import helmet from "helmet";
import cors from "cors";
import AuthRoute from "./auth/auth.route";
import AuthMiddleware from "./auth/middlewares/auth.middleware";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', ((req: Request, res: Response): void => {
    res.send('Hello from home page!');
}));

app.use('/auth', new AuthRoute().router);
app.use('/users', [
    AuthMiddleware.validateToken,
    new UserRouter().router
]);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))

