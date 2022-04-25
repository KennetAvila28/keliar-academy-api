import { fold } from '../../../shared/core/Either'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { StudentRepository } from '../domain/StudentRepository'
import { StudentPasswordUpdateParams } from '../domain/StudentRequest'
import { StudentPassword } from '../domain/StudentValueObjects'

export class ChangePasswordStudent {
  static async run(
    id: UniqueId,
    request: StudentPasswordUpdateParams,
    repository: StudentRepository
  ): Promise<void> {
    const password = new StudentPassword(request.password)
    if (!password.isValid()) throw new Error('INVALID_PASSWORD')
    const result = await repository.changePassword(id.get(), request.password)
    fold(
      result,
      (err) => {
        throw new Error(err)
      },
      (user) => {}
    )
  }
}
