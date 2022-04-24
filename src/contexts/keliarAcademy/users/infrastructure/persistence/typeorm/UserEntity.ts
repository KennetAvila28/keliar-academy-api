import { EntitySchema } from 'typeorm'
import { User } from '../../../domain/User'
export const UserEntity = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  target: User,
  columns: {
    _id: {
      type: String,
      primary: true,
    },
    names: {
      type: String,
      length: 150,
    },
    lastNames: {
      type: String,
      length: 150,
    },
    phone: {
      type: String,
      length: 15,
    },

    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
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
    photo: {
      type: String,
      nullable: true,
    },
  },
  relations: {
    roles: {
      type: 'many-to-many',
      target: 'Role',
      joinTable: {
        name: 'userRoles',
        joinColumn: {
          name: 'userId',
          referencedColumnName: '_id',
        },
        inverseJoinColumn: {
          name: 'roleId',
          referencedColumnName: '_id',
        },
      },
    },
  },
})
