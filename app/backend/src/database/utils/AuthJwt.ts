import 'dotenv/config';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;

export default class AuthJwt {
  static sign(data: { email: string, password: string }): string {
    return sign(data, jwtSecret);
  }

  static verify(token: string): string | null | undefined {
    try {
      const { email } = verify(token, jwtSecret) as JwtPayload;
      return email;
    } catch (e) {
      const erro = new Error('Token must be a valid token');
      erro.name = 'ValidationError';
      throw erro;
    }
  }
}
