import { inject, injectable } from 'inversify'
import { TYPE } from '../../../../app/ioc/Types'
import { PermissionRepository } from '../domain/PermissionRepository'
import { GetAllPermissions } from './GetAllPermissions'

@injectable()
export class PermissionService {
    private repository: PermissionRepository

    constructor(@inject(TYPE.Domain.Permission.Repository) repository: PermissionRepository) {
        this.repository = repository
    }

    async get(): Promise<any[]> {
        return await GetAllPermissions.run(this.repository)
    }
}