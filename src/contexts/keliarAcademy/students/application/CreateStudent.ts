/**
 * @description Use case for user creation
 * @author Kennet Avila
 */

import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { Student } from '../domain/Student'
import { StudentRepository } from '../domain/StudentRepository'
import { StudentEmail, StudentPassword } from '../domain/StudentValueObjects'
import { v4 } from 'uuid'
import { StudentCreationParams } from '../domain/StudentRequest'
import { fold, getOrElse } from '../../../shared/core/Either'
import { StudentFailure } from '../domain/StudentFailures'

export class CreateStudent {
  static async run(
    request: StudentCreationParams,
    repository: StudentRepository
  ): Promise<any> {
    const user = Student.create(
      new UniqueId(v4()),
      new StudentEmail(request.email),
      new StudentPassword(request.password),
      request.names,
      request.lastNames,
      request.phone,
      request.photo,
      request.Classes
    )
    const _user = getOrElse(user, (err) => {
      throw new Error(err)
    })
    const result = await repository.save(_user)
    return fold<StudentFailure, Student, any>(
      result,
      (err) => {
        throw new Error(err)
      },
      (user: Student) => {
        return user.toPrimitives()
      }
    )
  }
}
