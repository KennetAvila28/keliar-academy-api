import { PermissionEntity } from '../../../../keliarAcademy/permissions/infrastructure/persistence/typeorm/PermissionEntity'
import { RoleEntity } from '../../../../keliarAcademy/roles/infrastructure/persistence/typeorm/RoleEntity'
import { UserEntity } from '../../../../keliarAcademy/users/infrastructure/persistence/typeorm/UserEntity'

export const TypeOrmEntities = [UserEntity, RoleEntity, PermissionEntity]
