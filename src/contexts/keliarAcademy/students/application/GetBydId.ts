/**
 * @description Use case for user creation
 * @author Kennet Avila
 */

import { fold } from '../../../shared/core/Either'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { StudentRepository } from '../domain/StudentRepository'
import { StudentResponseModel } from '../domain/StudentRequest'

export class GetById {
  static async run(
    id: UniqueId,
    repository: StudentRepository
  ): Promise<StudentResponseModel> {
    const result = await repository.searchById(id.get())
    return fold(
      result,
      (error) => {
        throw new Error(error)
      },
      (user) => user.toPrimitives()
    )
  }
}
