import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private _user: LoginService) { }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      const e = new Error('All fields must be filled');
      e.name = 'InvalidData';
      throw e;
    }
    const token = await this._user.login(req.body);

    return res.status(200).json({ token });
  }

  async loginValidate(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
      const e = new Error('Unauthorized');
      e.name = 'ValidationError';
      throw e;
    }

    const role = await this._user.loginValidate(authorization);

    return res.status(200).json({ role });
  }
}
