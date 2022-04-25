/**
 * @description ClassRepository interface for implements on infrastructure layer
 * @author Kennet Avila
 */

import { Either } from '../../../shared/core/Either'
import { Class } from './Class'
import { ClassFailure } from './ClassFailures'
import { ClassFilterRequest } from './ClassFilterRequest'
import { ClassUpdateParams } from './ClassRequest'

export interface ClassRepository {
  /**
   * Save a Class on the origine
   * @param Class Class entity
   */
  save(Class: Class): Promise<Either<ClassFailure, Class>>

  /**
   * Search Class by id
   * @param id Class Id
   */
  searchById(id: string): Promise<Either<ClassFailure, Class>>
  /**
   * Search Class by filter
   */
  searchByCriteria(
    filter: ClassFilterRequest
  ): Promise<Either<ClassFailure, Class[]>>
  /**
   * Update a Class by id
   * @param id Class id
   * @param Class Class entity
   */
  update(
    id: string,
    Class: ClassUpdateParams
  ): Promise<Either<ClassFailure, Class>>
  /**
   * Change state of a Class to active or inactive
   * @param id Class id
   * @param isActive Class state
   */
  changeState(
    id: string,
    isActive: boolean
  ): Promise<Either<ClassFailure, Class>>

  /**
   * Change state of a Class to archived or not archived
   * @param id Class id
   * @param isArchived Class state
   *
   */
  changeArchived(
    id: string,
    isArchived: boolean
  ): Promise<Either<ClassFailure, Class>>

  /**
   * Get Classs archived
   *
   */
  getArchived(
    filter: ClassFilterRequest
  ): Promise<Either<ClassFailure, Class[]>>
}
