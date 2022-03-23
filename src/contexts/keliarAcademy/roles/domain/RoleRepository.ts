/**
 * @description RoleRepository interface for implements on infrastructure layer
 * @author Kennet Avila
 */

import { Either } from '../../../shared/core/Either'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { Role } from './Role'
import { RoleFailure } from './RoleFailures'
import { RoleFilterRequest } from './RoleFilterRequest'
import { RoleUpdateParams } from "./RoleRequest";

export interface RoleRepository {
  /**
   * Save a role on the origine
   * @param role Role entity
   */
  save(role: Role): Promise<Either<RoleFailure, Role>>;

  /**
   * Search role by id
   * @param id Role Id
   */
  searchById(id: UniqueId): Promise<Either<RoleFailure, Role>>;
  /**
   * Search role by filter
   */
  searchByCriteria(filter: RoleFilterRequest): Promise<Either<RoleFailure, Role[]>>;
  /**
     * Update a role by id
     * @param id Role id
     * @param role Role entity
     */
  update(id: UniqueId, role: RoleUpdateParams): Promise<Either<RoleFailure, Role>>;
  /**
    * Change state of a role to active or inactive
    * @param id Role id
    * @param isActive Role state
    */
  changeState(id: UniqueId, isActive: boolean): Promise<Either<RoleFailure, Role>>;

  /**
   * Change state of a role to archived or not archived
   * @param id Role id
   * @param isArchived Role state
   * 
   */
  changeArchived(id: UniqueId, isArchived: boolean): Promise<Either<RoleFailure, Role>>;

  /**
   * Get roles archived
   * 
   */
  getArchived(filter: RoleFilterRequest): Promise<Either<RoleFailure, Role[]>>;
}
