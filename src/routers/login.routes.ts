import { Router } from "express";
import { loginController } from "../controllers/login/postLogin.controllers";

const routerLogin: Router = Router();

routerLogin.post("", loginController);

export default routerLogin;
