import { inject, injectable } from 'inversify'
import { TYPE } from '../../../../app/ioc/Types'
import { UserRepository } from '../../users/domain/UserRepository'
import { AuthParams, JWToken } from '../domain/AuthTypes'
import { GetAccessToken } from './GetAccessToken'

@injectable()
export class AuthService {
  private repository: UserRepository

  constructor(@inject(TYPE.Domain.User.Repository) repository: UserRepository) {
    this.repository = repository
  }

  async login(auth: AuthParams): Promise<JWToken> {
    return await GetAccessToken.run(auth, this.repository)
  }
}
