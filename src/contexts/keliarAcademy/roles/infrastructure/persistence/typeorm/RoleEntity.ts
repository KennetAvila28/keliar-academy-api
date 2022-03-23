import { EntitySchema } from 'typeorm'
import { UniqueId } from '../../../../../shared/domain/valueobjects/UniqueId'
import { TypeOrmTransformer } from '../../../../../shared/infrastructure/persistence/typeorm/TypeOrmTransformer'
import { Role } from '../../../domain/Role'
export const RoleEntity = new EntitySchema<Role>({
  name: 'Role',
  tableName: 'roles',
  target: Role,
  columns: {
    _id: {
      type: String,
      primary: true,
      transformer: TypeOrmTransformer(UniqueId),
    },
    name:{
      type: String,
      length: 150
    },
    createdAt: {
      type: Date,
      nullable: true,
    },
    isActive:{
      type:Boolean,
      default: true
    },
    isArchived:{
      type:Boolean,
      default: false
    },
  },

});
