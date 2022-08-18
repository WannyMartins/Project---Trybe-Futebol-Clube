import ILogin from './ILogin';

export default interface ILoginService {
  login({ email, password }: ILogin): Promise<string>,
}
