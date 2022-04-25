/**
 * @description Use case for role creation
 * @author Kennet Avila
 */

import { Class } from '../domain/Class'
import { ClassRepository } from '../domain/ClassRepository'
import { ClassCreationParams } from '../domain/ClassRequest'
import { fold, getOrElse } from '../../../shared/core/Either'
import { ClassFailure } from '../domain/ClassFailures'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { v4 } from 'uuid'

export class CreateClass {
  static async run(
    request: ClassCreationParams,
    repository: ClassRepository
  ): Promise<any> {
    const role = Class.create(new UniqueId(v4()), request.name)
    const _role = getOrElse(role, (err) => {
      throw new Error(err)
    })
    const result = await repository.save(_role)
    return fold<ClassFailure, Class, any>(
      result,
      (err) => {
        throw new Error(err)
      },
      (role: Class) => {
        return role.toPrimitives()
      }
    )
  }
}
