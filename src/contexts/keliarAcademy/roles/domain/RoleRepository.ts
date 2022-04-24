/**
 * @description RoleRepository interface for implements on infrastructure layer
 * @author Kennet Avila
 */

import { Either } from '../../../shared/core/Either'
import { Role } from './Role'
import { RoleFailure } from './RoleFailures'
import { RoleFilterRequest } from './RoleFilterRequest'
import { RoleUpdateParams } from './RoleRequest'

export interface RoleRepository {
  /**
   * Save a role on the origine
   * @param role Role entity
   */
  save(role: Role): Promise<Either<RoleFailure, Role>>

  /**
   * Search role by id
   * @param id Role Id
   */
  searchById(id: string): Promise<Either<RoleFailure, Role>>
  /**
   * Search role by filter
   */
  searchByCriteria(
    filter: RoleFilterRequest
  ): Promise<Either<RoleFailure, Role[]>>
  /**
   * Update a role by id
   * @param id Role id
   * @param role Role entity
   */
  update(id: string, role: RoleUpdateParams): Promise<Either<RoleFailure, Role>>
  /**
   * Change state of a role to active or inactive
   * @param id Role id
   * @param isActive Role state
   */
  changeState(id: string, isActive: boolean): Promise<Either<RoleFailure, Role>>

  /**
   * Change state of a role to archived or not archived
   * @param id Role id
   * @param isArchived Role state
   *
   */
  changeArchived(
    id: string,
    isArchived: boolean
  ): Promise<Either<RoleFailure, Role>>

  /**
   * Get roles archived
   *
   */
  getArchived(filter: RoleFilterRequest): Promise<Either<RoleFailure, Role[]>>
}
