/**
 * @description UserRepository interface for implements on infrastructure layer
 * @author Kennet Avila
 */

import { Either } from '../../../shared/core/Either'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { User } from './User'
import { UserFailure } from './UserFailures'
import { UserFilterRequest } from './UserFilterRequest'
import { UserEmail, UserPassword } from './UserValueObjects'
import { UserUpdateParams } from "./UserRequest";

export interface UserRepository {
  /**
   * Save a user on the origine
   * @param user User entity
   */
  save(user: User): Promise<Either<UserFailure, User>>;

  /**
   * Search user by id
   * @param id User Id
   */
  searchById(id: UniqueId): Promise<Either<UserFailure, User>>;

  /**
   *
   * @param email
   */
  searchByEmail(email: UserEmail): Promise<Either<UserFailure, User>>;

  /**
   * Search user by filter
   */
  searchByCriteria(filter: UserFilterRequest): Promise<Either<UserFailure, User[]>>;
  /**
     * Update a user by id
     * @param id User id
     * @param user User entity
     */
   update(id: UniqueId, user: UserUpdateParams): Promise<Either<UserFailure, User>>;
   /**
    * Change the password of a user
    * @param id User id    
    * @param password User password
    * 
    */
   changePassword(id: UniqueId, password: UserPassword): Promise<Either<UserFailure, User>>;

   /**
    * Change state of a user to active or inactive
    * @param id User id
    * @param isActive User state
    */
   changeState(id: UniqueId, isActive: boolean): Promise<Either<UserFailure, User>>;

   /**
    * Change state of a user to archived or not archived
    * @param id User id
    * @param isArchived User state
    * 
    */
   changeArchived(id: UniqueId, isArchived: boolean): Promise<Either<UserFailure, User>>;

   /**
    * Get users archived
    * 
    */
   getArchived(filter: UserFilterRequest): Promise<Either<UserFailure, User[]>>;
}
