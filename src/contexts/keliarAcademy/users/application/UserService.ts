import { inject, injectable } from 'inversify'
import { TYPE } from '../../../../app/ioc/Types'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { UserRepository } from '../domain/UserRepository'
import { UserCreationParams } from '../domain/UserRequest'
import { CreateUser } from './CreateUser'
import { GetById } from './GetBydId'
import { GetUsers } from './GetUser'

@injectable()
export class UserService {
  private repository: UserRepository

  constructor(@inject(TYPE.Domain.User.Repository) repository: UserRepository) {
    this.repository = repository
  }

  async get(): Promise<any[]> {
    return await GetUsers.run(this.repository)
  }

  async getById(id: UniqueId): Promise<any> {
    return await GetById.run(id, this.repository)
  }

  async createUser(userRequest: UserCreationParams): Promise<void> {
    await CreateUser.run(userRequest, this.repository)
  }
}
