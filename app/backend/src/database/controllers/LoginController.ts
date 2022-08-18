import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private _user: LoginService) { }

  async login(req: Request, res: Response) {
    if (!req.body.email || !req.body.password) {
      const e = new Error('All fields must be filled');
      e.name = 'InvalidData';
      throw e;
    }
    const token = await this._user.login(req.body);

    return res.status(200).json({ token });
  }
}
