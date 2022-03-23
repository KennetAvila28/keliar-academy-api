import { inject, injectable } from 'inversify'
import { TYPE } from '../../../../app/ioc/Types'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { UserFilterRequest } from '../domain/UserFilterRequest'
import { UserRepository } from '../domain/UserRepository'
import { UserActiveParams, UserArchivedParams, UserCreationParams, UserPasswordUpdateParams, UserUpdateParams } from '../domain/UserRequest'
import { ChangePasswordUser } from './ChangePasswordUser'
import { CreateUser } from './CreateUser'
import { GetArchivedUsers } from './GetArchivedUsers'
import { GetById } from './GetBydId'
import { GetUsers } from './GetUsers'
import { SetActiveUser } from './SetActiveUser'
import { SetArchivedUser } from './SetArchivedUser'
import { UpdatedUser } from './UpdateUser'

@injectable()
export class UserService {
  private repository: UserRepository;

  constructor(@inject(TYPE.Domain.User.Repository) repository: UserRepository) {
    this.repository = repository;
  }

  async get(filter: UserFilterRequest): Promise<any[]> {
    return await GetUsers.run(filter, this.repository);
  }

  async getById(id: UniqueId): Promise<any> {
    return await GetById.run(id, this.repository);
  }

  async createUser(userRequest: UserCreationParams): Promise<any> {
    return await CreateUser.run(userRequest, this.repository);
  }

  async setArchivedUser(id: string, request: UserArchivedParams): Promise<any> {
    return await SetArchivedUser.run(new UniqueId(id), request, this.repository);
  }
  async setActiveUser(id: string, request: UserActiveParams): Promise<any> {
    return await SetActiveUser.run(new UniqueId(id), request, this.repository);
  }
  async changePassword(id: string, request: UserPasswordUpdateParams): Promise<any> {
    return await ChangePasswordUser.run(new UniqueId(id), request, this.repository);
  }
  async updateUser(id: string, request: UserUpdateParams): Promise<any> {
    return await UpdatedUser.run(id, request, this.repository);
  }
  async getArchivedUsers(filters: UserFilterRequest): Promise<any[]>{
    return await GetArchivedUsers.run(filters, this.repository)
  }
}
