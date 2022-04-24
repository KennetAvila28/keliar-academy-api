import { fold } from '../../../shared/core/Either'
import { Permission } from '../domain/Permission'
import { PermissionFailure } from '../domain/PermissionFailure'
import { PermissionRepository } from '../domain/PermissionRepository'

export class GetAllPermissions {
    static async run(repository: PermissionRepository): Promise<any> {
        const result = await repository.findAll()
        return fold<PermissionFailure, Permission[], any>(
            result,
            (error) => {
                throw new Error(error)
            },
            (Permission) => Permission.map((u) => u.toPrimitives())
        )
    }
}