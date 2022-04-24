/**
 *
 */

import { EntitySchema } from 'typeorm'
import { Either, left, right } from '../../../../shared/core/Either'
import { TypeOrmRepository } from '../../../../shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { User } from '../../domain/User'
import { UserFailure } from '../../domain/UserFailures'
import { UserRepository } from '../../domain/UserRepository'
import { UserEntity } from './typeorm/UserEntity'
import { injectable } from 'inversify'
import { UserFilterRequest } from '../../domain/UserFilterRequest'
import { UserUpdateParams } from '../../domain/UserRequest'

/**
 * TypeOrm implementation of the UserRepository
 */
@injectable()
export class TypeOrmUserRepository
  extends TypeOrmRepository<User>
  implements UserRepository
{
  async searchByEmail(email: string): Promise<Either<UserFailure, User>> {
    const repository = await this.repository()
    const user = await repository.findOne({ email: email })
    if (user instanceof User) {
      return right(user)
    }
    return left('USER_NOT_FOUND')
  }

  async searchByCriteria(
    filter: UserFilterRequest
  ): Promise<Either<UserFailure, User[]>> {
    const repository = await this.repository()
    let users = (await repository.find({ relations: ['roles'] })).filter(
      (user) => !user.isArchived
    )
    if (filter.names)
      users = users.filter((user) => user.names.includes(filter.names!))
    if (filter.lastNames)
      users = users.filter((user) => user.lastNames.includes(filter.lastNames!))
    if (filter.isActive !== undefined)
      users = users.filter((user) => user.isActive === filter.isActive)
    return right(users)
  }

  async save(user: User): Promise<Either<UserFailure, User>> {
    try {
      const result = await this.persist(user)
      return right(result)
    } catch (err: any) {
      if (err.code === '23505') return left('EMAIL_ALREADY_EXIST')
      return left('UNEXPECTED_ERROR')
    }
  }

  async searchById(id: string): Promise<Either<UserFailure, User>> {
    const repository = await this.repository()
    const user = await repository.findOne(id, { relations: ['roles'] })
    if (user instanceof User) {
      return right(user)
    }
    return left('USER_NOT_FOUND')
  }

  async update(
    id: string,
    user: UserUpdateParams
  ): Promise<Either<UserFailure, any>> {
    const repository = await this.repository()
    const userUpdated = await repository.update(id, user)
    if (userUpdated.affected !== undefined && userUpdated.affected > 0) {
      return right('Updated')
    }
    return left('USER_NOT_FOUND')
  }

  async changePassword(
    id: string,
    password: string
  ): Promise<Either<UserFailure, any>> {
    const repository = await this.repository()
    const userEntity = await repository.update(id, { password: password })
    if (userEntity.affected !== undefined && userEntity.affected > 0) {
      return right('Changed password')
    }
    return left('UNEXPECTED_ERROR')
  }

  async changeState(
    id: string,
    isActive: boolean
  ): Promise<Either<UserFailure, any>> {
    const repository = await this.repository()
    const userEntity = await repository.update(id, { isActive: isActive })
    if (userEntity.affected !== undefined && userEntity.affected > 0) {
      return right('Change active')
    }
    return left('UNEXPECTED_ERROR')
  }

  async changeArchived(
    id: string,
    isArchived: boolean
  ): Promise<Either<UserFailure, any>> {
    const repository = await this.repository()
    const userEntity = await repository.update(id, { isArchived: isArchived })
    if (userEntity.affected !== undefined && userEntity.affected > 0) {
      return right('Changed archived')
    }
    return left('UNEXPECTED_ERROR')
  }

  async getArchived(
    filter: UserFilterRequest
  ): Promise<Either<UserFailure, User[]>> {
    const repository = await this.repository()
    let users: User[] = (
      await repository.find({ relations: ['roles'] })
    ).filter((user) => user.isArchived)
    if (filter.names)
      users = users.filter((user) => user.names.includes(filter.names!))
    if (filter.lastNames)
      users = users.filter((user) => user.lastNames.includes(filter.lastNames!))
    if (filter.isActive !== undefined)
      users = users.filter((user) => user.isActive === filter.isActive)

    return right(users)
  }

  protected entitySchema(): EntitySchema<User> {
    return UserEntity
  }
}
