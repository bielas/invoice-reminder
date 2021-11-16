import UserRouter from "./user/user.route";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import AuthRoute from "./auth/auth.route";
import AuthMiddleware from "./auth/middlewares/auth.middleware";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from 'swagger-jsdoc';
import {swaggerOptions} from "../swagger-config";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('', (req, res) => res.redirect('/api-docs'))

app.use('/auth', new AuthRoute().router);
app.use('/users', [
    AuthMiddleware.validateToken,
    new UserRouter().router
]);

app.listen(PORT, () => console.log(`Run at: ${new Date()}. Server running on port: http://localhost:${PORT}`))
