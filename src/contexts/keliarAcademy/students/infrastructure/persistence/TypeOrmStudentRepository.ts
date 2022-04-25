/**
 *
 */

import { EntitySchema } from 'typeorm'
import { Either, left, right } from '../../../../shared/core/Either'
import { TypeOrmRepository } from '../../../../shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { Student } from '../../domain/Student'
import { StudentFailure } from '../../domain/StudentFailures'
import { StudentRepository } from '../../domain/StudentRepository'
import { StudentEntity } from './typeorm/StudentEntity'
import { injectable } from 'inversify'
import { StudentFilterRequest } from '../../domain/StudentFilterRequest'
import { StudentUpdateParams } from '../../domain/StudentRequest'

/**
 * TypeOrm implementation of the StudentRepository
 */
@injectable()
export class TypeOrmStudentRepository
  extends TypeOrmRepository<Student>
  implements StudentRepository
{
  async searchByEmail(email: string): Promise<Either<StudentFailure, Student>> {
    const repository = await this.repository()
    const entity = await repository.findOne({ email: email })
    if (entity instanceof Student) {
      return right(entity)
    }
    return left('STUDENT_NOT_FOUND')
  }

  async searchByCriteria(
    filter: StudentFilterRequest
  ): Promise<Either<StudentFailure, Student[]>> {
    const repository = await this.repository()
    let users = (await repository.find({ relations: ['classes'] })).filter(
      (entity) => !entity.isArchived
    )
    if (filter.names)
      users = users.filter((entity) => entity.names.includes(filter.names!))
    if (filter.lastNames)
      users = users.filter((entity) =>
        entity.lastNames.includes(filter.lastNames!)
      )
    if (filter.isActive !== undefined)
      users = users.filter((entity) => entity.isActive === filter.isActive)
    return right(users)
  }

  async save(entity: Student): Promise<Either<StudentFailure, Student>> {
    try {
      const result = await this.persist(entity)
      return right(result)
    } catch (err: any) {
      if (err.code === '23505') return left('EMAIL_ALREADY_EXIST')
      return left('UNEXPECTED_ERROR')
    }
  }

  async searchById(id: string): Promise<Either<StudentFailure, Student>> {
    const repository = await this.repository()
    const entity = await repository.findOne(id, { relations: ['classes'] })
    if (entity instanceof Student) {
      return right(entity)
    }
    return left('STUDENT_NOT_FOUND')
  }

  async update(
    id: string,
    entity: StudentUpdateParams
  ): Promise<Either<StudentFailure, any>> {
    const repository = await this.repository()
    const userUpdated = await repository.update(id, entity)
    if (userUpdated.affected !== undefined && userUpdated.affected > 0) {
      return right('Updated')
    }
    return left('STUDENT_NOT_FOUND')
  }

  async changePassword(
    id: string,
    password: string
  ): Promise<Either<StudentFailure, any>> {
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
  ): Promise<Either<StudentFailure, any>> {
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
  ): Promise<Either<StudentFailure, any>> {
    const repository = await this.repository()
    const userEntity = await repository.update(id, { isArchived: isArchived })
    if (userEntity.affected !== undefined && userEntity.affected > 0) {
      return right('Changed archived')
    }
    return left('UNEXPECTED_ERROR')
  }

  async getArchived(
    filter: StudentFilterRequest
  ): Promise<Either<StudentFailure, Student[]>> {
    const repository = await this.repository()
    let users: Student[] = (
      await repository.find({ relations: ['classes'] })
    ).filter((entity) => entity.isArchived)
    if (filter.names)
      users = users.filter((entity) => entity.names.includes(filter.names!))
    if (filter.lastNames)
      users = users.filter((entity) =>
        entity.lastNames.includes(filter.lastNames!)
      )
    if (filter.isActive !== undefined)
      users = users.filter((entity) => entity.isActive === filter.isActive)

    return right(users)
  }

  protected entitySchema(): EntitySchema<Student> {
    return StudentEntity
  }
}
