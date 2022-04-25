/**
 * @description Use case for user creation
 * @author Kennet Avila
 */

import { fold } from '../../../shared/core/Either'
import { StudentFilterRequest } from '../domain/StudentFilterRequest'
import { StudentRepository } from '../domain/StudentRepository'
import { StudentResponseModel } from '../domain/StudentRequest'

export class GetStudents {
  static async run(
    filter: StudentFilterRequest,
    repository: StudentRepository
  ): Promise<StudentResponseModel[]> {
    const result = await repository.searchByCriteria(filter)
    return fold(
      result,
      (error) => {
        throw new Error(error)
      },
      (user) => user.map((u) => u.toPrimitives())
    )
  }
}
