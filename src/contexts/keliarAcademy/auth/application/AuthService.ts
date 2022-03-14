import { inject, injectable } from 'inversify'
import { TYPE } from '../../../../app/ioc/Types'

import { UserRepository } from '../../users/domain/UserRepository'
import { AuthRequest } from '../domain/AuthRequest'

@injectable()
export class UserService {
  private repository: UserRepository

  constructor(@inject(TYPE.Domain.User.Repository) repository: UserRepository) {
    this.repository = repository
  }

  // getAccessToken(user:AuthRequest,userRepository:UserRepository): string {
  //   // return await 
  // }
}
