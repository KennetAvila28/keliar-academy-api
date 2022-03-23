/**
 * @description Use case for user creation
 * @author Kennet Avila
 */

import { fold } from '../../../shared/core/Either'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { User } from '../domain/User'
import { UserFailure } from '../domain/UserFailures'
import { UserRepository } from '../domain/UserRepository'

export class GetById {
  static async run(id: UniqueId, repository: UserRepository): Promise<any> {
    const result = await repository.searchById(id);

    return fold<UserFailure, User, any>(
      result,
      (error) => {
        throw new Error(error);
      },
      (user) => user.toPrimitives()
    );
  }
}
