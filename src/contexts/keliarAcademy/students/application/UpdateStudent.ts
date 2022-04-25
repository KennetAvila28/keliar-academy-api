/**
 * @description Use case for user creation
 * @author Kennet Avila
 */

import { fold } from '../../../shared/core/Either'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { StudentRepository } from '../domain/StudentRepository'
import { StudentUpdateParams } from '../domain/StudentRequest'
export class UpdatedStudent {
  static async run(
    id: UniqueId,
    request: StudentUpdateParams,
    repository: StudentRepository
  ): Promise<void> {
    const result = await repository.update(id.get(), request)
    fold(
      result,
      (err) => {
        throw new Error(err)
      },
      (user) => {}
    )
  }
}
