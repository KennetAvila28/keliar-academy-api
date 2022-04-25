import { fold } from '../../../shared/core/Either'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { StudentRepository } from '../domain/StudentRepository'
import { StudentArchivedParams } from '../domain/StudentRequest'

export class SetArchivedStudent {
  static async run(
    id: UniqueId,
    request: StudentArchivedParams,
    repository: StudentRepository
  ): Promise<void> {
    const result = await repository.changeArchived(id.get(), request.isArchived)
    fold(
      result,
      (err) => {
        throw new Error(err)
      },
      (user) => {}
    )
  }
}
