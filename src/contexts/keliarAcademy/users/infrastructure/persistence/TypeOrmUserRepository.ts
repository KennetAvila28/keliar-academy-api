/**
 *
 */

import { EntitySchema } from 'typeorm'
import { Either, left, right } from '../../../../shared/core/Either'
import { UniqueId } from '../../../../shared/domain/valueobjects/UniqueId'
import { TypeOrmRepository } from '../../../../shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { User } from '../../domain/User'
import { UserFailure } from '../../domain/UserFailures'
import { UserRepository } from '../../domain/UserRepository'
import { UserEmail } from '../../domain/UserValueObjects'
import { UserEntity } from './typeorm/UserEntity'
import { injectable } from 'inversify'

/**
 * TypeOrm implementation of the UserRepository
 */
@injectable()
export class TypeOrmUserRepository
  extends TypeOrmRepository<User>
  implements UserRepository
{
  async searchByEmail(email: UserEmail): Promise<Either<UserFailure, User>> {
    const repository = await this.repository()
    const user = await repository.findOne({ email: email })
    if (user instanceof User) {
      return right(user)
    }
    return left('USER_NOT_FOUND')
  }

  async searchByCriteria(): Promise<Either<UserFailure, User[]>> {
    const repository = await this.repository()
    const users = await repository.find()
    return right(users)
  }

  async save(user: User): Promise<Either<UserFailure, User>> {
    try {
      return right(await this.persist(user))
    } catch (err: any) {
      if (err.code === '23505') return left('EMAIL_ALREADY_EXIST')
      return left('UNEXPECTED_ERROR')
    }
  }

  async searchById(id: UniqueId): Promise<Either<UserFailure, User>> {
    const repository = await this.repository()
    const user = await repository.findOne({ _id: id })
    if (user instanceof User) {
      return right(user)
    }
    return left('USER_NOT_FOUND')
  }

  protected entitySchema(): EntitySchema<User> {
    return UserEntity
  }
  
}
