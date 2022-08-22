import 'dotenv/config';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;

export default class AuthJwt {
  static sign(data: { email: string, password: string }): string {
    return sign(data, jwtSecret);
  }

  static verify(token: string): string | null {
    const { email } = verify(token, jwtSecret) as JwtPayload;
    return email;
  }
}
