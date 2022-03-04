import { inject, injectable } from 'inversify'
import { TYPE } from '../../../../app/ioc/Types'

import { UserRepository } from '../../users/domain/UserRepository'

@injectable()
export class UserService {
  private repository: UserRepository

  constructor(@inject(TYPE.Domain.User.Repository) repository: UserRepository) {
    this.repository = repository
  }
}
