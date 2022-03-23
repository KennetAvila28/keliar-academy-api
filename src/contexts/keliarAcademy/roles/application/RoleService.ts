import { inject, injectable } from 'inversify'
import { TYPE } from '../../../../app/ioc/Types'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { RoleFilterRequest } from '../domain/RoleFilterRequest'
import { RoleRepository } from '../domain/RoleRepository'
import { RoleActiveParams, RoleArchivedParams, RoleCreationParams, RoleUpdateParams } from '../domain/RoleRequest'
import { CreateRole } from './CreateRole'
import { GetArchivedRoles } from './GetArchivedRoles'
import { GetById } from './GetBydId'
import { GetRoles } from './GetRoles'
import { SetActiveRole } from './SetActiveRole'
import { SetArchivedRole } from './SetArchivedRole'
import { UpdatedRole } from './UpdateRole'

@injectable()
export class RoleService {
  private repository: RoleRepository;

  constructor(@inject(TYPE.Domain.Role.Repository) repository: RoleRepository) {
    this.repository = repository;
  }

  async get(filter: RoleFilterRequest): Promise<any[]> {
    return await GetRoles.run(filter, this.repository);
  }

  async getById(id: UniqueId): Promise<any> {
    return await GetById.run(id, this.repository);
  }

  async createRole(roleRequest: RoleCreationParams): Promise<any> {
    return await CreateRole.run(roleRequest, this.repository);
  }

  async setArchivedRole(id: string, request: RoleArchivedParams): Promise<any> {
    return await SetArchivedRole.run(new UniqueId(id), request, this.repository);
  }
  async setActiveRole(id: string, request: RoleActiveParams): Promise<any> {
    return await SetActiveRole.run(new UniqueId(id), request, this.repository);
  }
  async updateRole(id: string, request: RoleUpdateParams): Promise<any> {
    return await UpdatedRole.run(id, request, this.repository);
  }
  async getArchivedRoles(filters: RoleFilterRequest): Promise<any[]>{
    return await GetArchivedRoles.run(filters, this.repository)
  }
}
