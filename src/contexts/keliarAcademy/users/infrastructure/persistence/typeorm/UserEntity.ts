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
    names: {
      type: String,
      transformer: TypeOrmTransformer(UserName)
    },
    lastNames: {
      type: String,
      transformer: TypeOrmTransformer(UserName)
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
  },

})
