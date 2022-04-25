import { Class } from '../domain/Class'
import { ClassRepository } from '../domain/ClassRepository'
import { ClassUpdateParams } from '../domain/ClassRequest'
import { fold } from '../../../shared/core/Either'

export class UpdatedClass {
  static async run(
    id: string,
    request: ClassUpdateParams,
    repository: ClassRepository
  ): Promise<void> {
    const result = await repository.update(id, request)
    return fold(
      result,
      (err) => {
        throw new Error(err)
      },
      (role: Class) => {}
    )
  }
}
