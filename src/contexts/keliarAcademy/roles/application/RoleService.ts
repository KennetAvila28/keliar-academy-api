import { inject, injectable } from 'inversify'
import { TYPE } from '../../../../app/ioc/Types'
import { RoleFilterRequest } from '../domain/RoleFilterRequest'
import { RoleRepository } from '../domain/RoleRepository'
import {
  RoleActiveParams,
  RoleArchivedParams,
  RoleCreationParams,
  RoleResponseModel,
  RoleUpdateParams,
} from '../domain/RoleRequest'
import { CreateRole } from './CreateRole'
import { GetArchivedRoles } from './GetArchivedRoles'
import { GetById } from './GetBydId'
import { GetRoles } from './GetRoles'
import { SetActiveRole } from './SetActiveRole'
import { SetArchivedRole } from './SetArchivedRole'
import { UpdatedRole } from './UpdateRole'

@injectable()
export class RoleService {
  private repository: RoleRepository

  constructor(@inject(TYPE.Domain.Role.Repository) repository: RoleRepository) {
    this.repository = repository
  }

  async get(filter: RoleFilterRequest): Promise<RoleResponseModel[]> {
    return await GetRoles.run(filter, this.repository)
  }

  async getById(id: string): Promise<RoleResponseModel> {
    return await GetById.run(id, this.repository)
  }

  async createRole(roleRequest: RoleCreationParams): Promise<void> {
    await CreateRole.run(roleRequest, this.repository)
  }

  async setArchivedRole(
    id: string,
    request: RoleArchivedParams
  ): Promise<void> {
    await SetArchivedRole.run(id, request, this.repository)
  }

  async setActiveRole(id: string, request: RoleActiveParams): Promise<void> {
    await SetActiveRole.run(id, request, this.repository)
  }

  async updateRole(id: string, request: RoleUpdateParams): Promise<void> {
    await UpdatedRole.run(id, request, this.repository)
  }

  async getArchivedRoles(
    filters: RoleFilterRequest
  ): Promise<RoleResponseModel[]> {
    return await GetArchivedRoles.run(filters, this.repository)
  }
}
