import { EntitySchema } from 'typeorm'
import { UniqueId } from '../../../../../shared/domain/valueobjects/UniqueId'
import { TypeOrmTransformer } from '../../../../../shared/infrastructure/persistence/typeorm/TypeOrmTransformer'
import { User } from '../../../domain/User'
import { UserEmail, UserName, UserPassword } from '../../../domain/UserValueObjects'

export const UserEntity = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  target: User,
  columns: {
    _id: {
      type: String,
      primary: true,
      transformer: TypeOrmTransformer(UniqueId),
    },
    names:{
      type: String,
      length: 150
    },
    lastNames:{
      type: String,
      length: 150
    },
    phone:{
      type: String,
      length: 15
    },

    email: {
      type: String,
      transformer: TypeOrmTransformer(UserEmail),
      unique: true,
    },
    password: {
      type: String,
      transformer: TypeOrmTransformer(UserPassword),
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
    photo:{
      type: String,
      nullable:true
    }
  },

})
