import 'dotenv/config';
import { sign } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;

export default class AuthJwt {
  static sign(data: { email: string, password: string }): string {
    return sign(data, jwtSecret);
  }
}
