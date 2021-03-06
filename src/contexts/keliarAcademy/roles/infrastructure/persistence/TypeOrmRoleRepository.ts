/**
 *
 */
import { EntitySchema } from 'typeorm'
import { Either, left, right } from '../../../../shared/core/Either'
import { TypeOrmRepository } from '../../../../shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { Role } from '../../domain/Role'
import { RoleFailure } from '../../domain/RoleFailures'
import { RoleRepository } from '../../domain/RoleRepository'
import { RoleEntity } from './typeorm/RoleEntity'
import { injectable } from 'inversify'
import { RoleFilterRequest } from '../../domain/RoleFilterRequest'
import { RoleUpdateParams } from '../../domain/RoleRequest'

/**
 * TypeOrmRoleRepository implementation of the RoleRepository.
 *
 * This repository is responsible for managing role entities
 */
@injectable()
export class TypeOrmRoleRepository
  extends TypeOrmRepository<Role>
  implements RoleRepository
{
  async searchByCriteria(
    filter: RoleFilterRequest
  ): Promise<Either<RoleFailure, Role[]>> {
    const repository = await this.repository()
    let roles = (await repository.find({ relations: ['permissions'] })).filter(
      (role) => !role.isArchived
    )
    if (filter.name)
      roles = roles.filter((role) => role.name.includes(filter.name!))
    if (filter.isActive !== undefined)
      roles = roles.filter((role) => role.isActive === filter.isActive)
    return right(roles)
  }

  async save(role: Role): Promise<Either<RoleFailure, Role>> {
    try {
      const result = await this.persist(role)
      return right(result)
    } catch (err: any) {
      return left('UNEXPECTED_ERROR')
    }
  }

  async searchById(id: string): Promise<Either<RoleFailure, Role>> {
    const repository = await this.repository()
    const role = await repository.findOne(id, { relations: ['permissions'] })
    if (role instanceof Role) {
      return right(role)
    }
    return left('ROLE_NOT_FOUND')
  }

  async update(
    id: string,
    role: RoleUpdateParams
  ): Promise<Either<RoleFailure, any>> {
    const repository = await this.repository()
    const roleUpdated = await repository.update(id, { name: role.name })
    if (roleUpdated.affected !== undefined && roleUpdated.affected > 0) {
      return right(await repository.findOne(id, { relations: ['permissions'] }))
    }
    return left('ROLE_NOT_FOUND')
  }

  async changeState(
    id: string,
    isActive: boolean
  ): Promise<Either<RoleFailure, any>> {
    const repository = await this.repository()
    const roleEntity = await repository.update(id, { isActive: isActive })
    if (roleEntity.affected !== undefined && roleEntity.affected > 0) {
      return right(await repository.findOne(id, { relations: ['permissions'] }))
    }
    return left('UNEXPECTED_ERROR')
  }

  async changeArchived(
    id: string,
    isArchived: boolean
  ): Promise<Either<RoleFailure, any>> {
    const repository = await this.repository()
    const roleEntity = await repository.update(id, { isArchived: isArchived })
    if (roleEntity.affected !== undefined && roleEntity.affected > 0) {
      return right(await repository.findOne(id, { relations: ['permissions'] }))
    }
    return left('UNEXPECTED_ERROR')
  }

  async getArchived(
    filter: RoleFilterRequest
  ): Promise<Either<RoleFailure, Role[]>> {
    const repository = await this.repository()
    let roles = (await repository.find({ relations: ['permissions'] })).filter(
      (role) => role.isArchived
    )
    if (filter.name)
      roles = roles.filter((role) => role.name.includes(filter.name!))
    if (filter.isActive !== undefined)
      roles = roles.filter((role) => role.isActive === filter.isActive)
    return right(roles)
  }

  protected entitySchema(): EntitySchema<Role> {
    return RoleEntity
  }
}
