import ILogin from '../interfaces/ILogin';
import ILoginService from '../interfaces/ILoginService';
import User from '../models/UsersModel';
import AuthJwt from '../utils/AuthJwt';
import Bcrypt from '../utils/Bcrypt';

export default class LoginService implements ILoginService {
  private _user = User;
  async login({ email, password }: ILogin): Promise<string> {
    const user = await this._user.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      const e = new Error('Incorrect email or password');
      e.name = 'ValidationError';
      throw e;
    }
    const validate = Bcrypt.compare(password, user.password);

    if (!validate) {
      const e = new Error('Dados Inválidos');
      e.name = 'InvalidData';
      throw e;
    }
    const token = AuthJwt.sign({ email: user.email, password });
    return token;
  }
}
