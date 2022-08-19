import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';

const loginService = new LoginService();
const loginController = new LoginController(loginService);

const loginRoute = Router();
loginRoute.get('/login/validate', (req, res) => loginController.loginValidate(req, res));
loginRoute.post('/login', (req, res) => loginController.login(req, res));

export default loginRoute;
