import { fold } from '../../../shared/core/Either'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { StudentRepository } from '../domain/StudentRepository'
import { StudentActiveParams } from '../domain/StudentRequest'

export class SetActiveStudent {
  static async run(
    id: UniqueId,
    request: StudentActiveParams,
    repository: StudentRepository
  ): Promise<void> {
    const result = await repository.changeState(id.get(), request.isActive)
    fold(
      result,
      (err) => {
        throw new Error(err)
      },
      (user) => {}
    )
  }
}
