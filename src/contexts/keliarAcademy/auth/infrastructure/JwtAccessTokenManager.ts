import jwt from 'jsonwebtoken'
import { AuthParams } from '../domain/AuthTypes'
const JWT_SECRET_KEY = 'keliar_academy_secret_key'

export class JwtAccessTokenManager {
  generate(user: AuthParams) {
    return jwt.sign(user, JWT_SECRET_KEY, { expiresIn: 24 * 60 * 60 })
  }
  // decode(accessToken) {
  //     return jwt.verify(accessToken, JWT_SECRET_KEY);
  // }
}
