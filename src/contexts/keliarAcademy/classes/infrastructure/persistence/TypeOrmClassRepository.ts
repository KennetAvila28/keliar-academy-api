/**
 *
 */
import { EntitySchema } from 'typeorm'
import { Either, left, right } from '../../../../shared/core/Either'
import { TypeOrmRepository } from '../../../../shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { Class } from '../../domain/Class'
import { ClassFailure } from '../../domain/ClassFailures'
import { ClassRepository } from '../../domain/ClassRepository'
import { ClassEntity } from './typeorm/ClassEntity'
import { injectable } from 'inversify'
import { ClassFilterRequest } from '../../domain/ClassFilterRequest'
import { ClassUpdateParams } from '../../domain/ClassRequest'

/**
 * TypeOrmClassRepository implementation of the ClassRepository.
 *
 * This repository is responsible for managing entity entities
 */
@injectable()
export class TypeOrmClassRepository
  extends TypeOrmRepository<Class>
  implements ClassRepository
{
  async searchByCriteria(
    filter: ClassFilterRequest
  ): Promise<Either<ClassFailure, Class[]>> {
    const repository = await this.repository()
    let entities = (await repository.find({ relations: ['students'] })).filter(
      (entity) => !entity.isArchived
    )
    if (filter.name)
      entities = entities.filter((entity) => entity.name.includes(filter.name!))
    if (filter.isActive !== undefined)
      entities = entities.filter(
        (entity) => entity.isActive === filter.isActive
      )
    return right(entities)
  }

  async save(entity: Class): Promise<Either<ClassFailure, Class>> {
    try {
      const result = await this.persist(entity)
      return right(result)
    } catch (err: any) {
      return left('UNEXPECTED_ERROR')
    }
  }

  async searchById(id: string): Promise<Either<ClassFailure, Class>> {
    const repository = await this.repository()
    const entity = await repository.findOne(id, { relations: ['students'] })
    if (entity instanceof Class) {
      return right(entity)
    }
    return left('CLASS_NOT_FOUND')
  }

  async update(
    id: string,
    entity: ClassUpdateParams
  ): Promise<Either<ClassFailure, any>> {
    const repository = await this.repository()
    const roleUpdated = await repository.update(id, { name: entity.name })
    if (roleUpdated.affected !== undefined && roleUpdated.affected > 0) {
      return right(await repository.findOne(id, { relations: ['students'] }))
    }
    return left('CLASS_NOT_FOUND')
  }

  async changeState(
    id: string,
    isActive: boolean
  ): Promise<Either<ClassFailure, any>> {
    const repository = await this.repository()
    const roleEntity = await repository.update(id, { isActive: isActive })
    if (roleEntity.affected !== undefined && roleEntity.affected > 0) {
      return right(await repository.findOne(id, { relations: ['students'] }))
    }
    return left('UNEXPECTED_ERROR')
  }

  async changeArchived(
    id: string,
    isArchived: boolean
  ): Promise<Either<ClassFailure, any>> {
    const repository = await this.repository()
    const roleEntity = await repository.update(id, { isArchived: isArchived })
    if (roleEntity.affected !== undefined && roleEntity.affected > 0) {
      return right(await repository.findOne(id, { relations: ['students'] }))
    }
    return left('UNEXPECTED_ERROR')
  }

  async getArchived(
    filter: ClassFilterRequest
  ): Promise<Either<ClassFailure, Class[]>> {
    const repository = await this.repository()
    let entities = (await repository.find({ relations: ['students'] })).filter(
      (entity) => entity.isArchived
    )
    if (filter.name)
      entities = entities.filter((entity) => entity.name.includes(filter.name!))
    if (filter.isActive !== undefined)
      entities = entities.filter(
        (entity) => entity.isActive === filter.isActive
      )
    return right(entities)
  }

  protected entitySchema(): EntitySchema<Class> {
    return ClassEntity
  }
}
