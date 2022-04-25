/**
 * @description Use case for user creation
 * @author Kennet Avila
 */

import { fold } from '../../../shared/core/Either'
import { Class } from '../domain/Class'
import { ClassFailure } from '../domain/ClassFailures'
import { ClassRepository } from '../domain/ClassRepository'
import { ClassResponseModel } from '../domain/ClassRequest'

export class GetById {
  static async run(
    id: string,
    repository: ClassRepository
  ): Promise<ClassResponseModel> {
    const result = await repository.searchById(id)

    return fold<ClassFailure, Class, any>(
      result,
      (error) => {
        throw new Error(error)
      },
      (role) => role.toPrimitives()
    )
  }
}
