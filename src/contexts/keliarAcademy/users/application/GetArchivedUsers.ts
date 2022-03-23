/**
 * @description Use case for user creation
 * @author Kennet Avila
 */

import { fold } from '../../../shared/core/Either'
import { User } from '../domain/User'
import { UserFailure } from '../domain/UserFailures'
import { UserFilterRequest } from '../domain/UserFilterRequest'
import { UserRepository } from '../domain/UserRepository'

export class GetArchivedUsers {
  static async run(filter: UserFilterRequest, repository: UserRepository): Promise<any[]> {
    const result = await repository.getArchived(filter);
    return fold<UserFailure, User[], any>(
      result,
      (error) => {
        throw new Error(error);
      },
      (user) => user.map((u) => u.toPrimitives())
    );
  }
}
