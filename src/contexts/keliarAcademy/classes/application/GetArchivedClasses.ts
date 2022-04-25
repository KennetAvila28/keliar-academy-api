/**
 * @description Use case for role creation
 * @author Kennet Avila
 */

import { fold } from '../../../shared/core/Either'
import { ClassFilterRequest } from '../domain/ClassFilterRequest'
import { ClassRepository } from '../domain/ClassRepository'
import { ClassResponseModel } from '../domain/ClassRequest'

export class GetArchivedClasses {
  static async run(
    filter: ClassFilterRequest,
    repository: ClassRepository
  ): Promise<ClassResponseModel[]> {
    const result = await repository.getArchived(filter)
    return fold(
      result,
      (error) => {
        throw new Error(error)
      },
      (role) => role.map((r) => r.toPrimitives())
    )
  }
}
