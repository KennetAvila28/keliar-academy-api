/**
 * @description UserRepository interface for implements on infrastructure layer
 * @author Kennet Avila
 */

import { Either } from '../../../shared/core/Either'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { User } from './User'
import { UserFailure } from './UserFailures'
import { UserEmail } from './UserValueObjects'

export interface UserRepository {
  /**
   * Save a user on the origine
   * @param user User entity
   */
  save(user: User): Promise<Either<UserFailure, User>>

  /**
   * Search user by id
   * @param id User Id
   */
  searchById(id: UniqueId): Promise<Either<UserFailure, User>>

  /**
   *
   * @param email
   */
  searchByEmail(email: UserEmail): Promise<Either<UserFailure, User>>

  /**
   * Search user by filter
   */
  searchByCriteria(): Promise<Either<UserFailure, User[]>>
}
