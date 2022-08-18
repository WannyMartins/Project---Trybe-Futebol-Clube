import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';

const loginService = new LoginService();
const loginController = new LoginController(loginService);

const loginRoute = Router();
loginRoute.post('/login', (req, res) => loginController.login(req, res));

export default loginRoute;
