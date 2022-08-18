import * as bcrypt from 'bcryptjs';

export default class Bcrypt {
  static compare = (userPassword: string, dbPassword: string): boolean => {
    const crypt = bcrypt.compareSync(userPassword, dbPassword);
    return crypt;
  };
}
