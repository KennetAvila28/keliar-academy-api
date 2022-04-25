import { StudentEntity } from '../../../../keliarAcademy/students/infrastructure/persistence/typeorm/StudentEntity'
import { ClassEntity } from '../../../../keliarAcademy/classes/infrastructure/persistence/typeorm/ClassEntity'
import { PermissionEntity } from '../../../../keliarAcademy/permissions/infrastructure/persistence/typeorm/PermissionEntity'
import { RoleEntity } from '../../../../keliarAcademy/roles/infrastructure/persistence/typeorm/RoleEntity'
import { UserEntity } from '../../../../keliarAcademy/users/infrastructure/persistence/typeorm/UserEntity'

export const TypeOrmEntities = [
  UserEntity,
  RoleEntity,
  PermissionEntity,
  StudentEntity,
  ClassEntity,
]
