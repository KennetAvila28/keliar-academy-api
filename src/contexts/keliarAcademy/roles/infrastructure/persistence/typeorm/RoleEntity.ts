import { EntitySchema } from 'typeorm'
import { Role } from '../../../domain/Role'
export const RoleEntity = new EntitySchema<Role>({
  name: 'Role',
  tableName: 'roles',
  target: Role,
  columns: {
    _id: {
      type: String,
      primary: true,
    },
    name: {
      type: String,
      length: 150,
    },
    createdAt: {
      type: Date,
      nullable: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  relations: {
    permissions: {
      type: 'many-to-many',
      target: 'Permission',
      joinTable: {
        name: 'rolesPermissions',
        joinColumn: {
          name: 'roleId',
          referencedColumnName: '_id',
        },
        inverseJoinColumn: {
          name: 'permissionId',
          referencedColumnName: '_id',
        },
      },
    },
  },
})
