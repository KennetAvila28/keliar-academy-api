import { fold } from '../../../shared/core/Either'
import { ClassRepository } from '../domain/ClassRepository'
import { ClassArchivedParams } from '../domain/ClassRequest'

export class SetArchivedClass {
  static async run(
    id: string,
    request: ClassArchivedParams,
    repository: ClassRepository
  ): Promise<void> {
    const result = await repository.changeArchived(id, request.isArchived)
    fold(
      result,
      (err) => {
        throw new Error(err)
      },
      (role) => {}
    )
  }
}
