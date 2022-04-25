/**
 * @description StudentRepository interface for implements on infrastructure layer
 * @author Kennet Avila
 */

import { Either } from '../../../shared/core/Either'
import { Student } from './Student'
import { StudentFailure } from './StudentFailures'
import { StudentFilterRequest } from './StudentFilterRequest'
import { StudentUpdateParams } from './StudentRequest'
export interface StudentRepository {
  /**
   * Save a user on the origine
   * @param user Student entity
   */
  save(user: Student): Promise<Either<StudentFailure, Student>>

  /**
   * Search user by id
   * @param id Student Id
   */
  searchById(id: string): Promise<Either<StudentFailure, Student>>

  /**
   *
   * @param email
   */
  searchByEmail(email: string): Promise<Either<StudentFailure, Student>>

  /**
   * Search user by filter
   */
  searchByCriteria(
    filter: StudentFilterRequest
  ): Promise<Either<StudentFailure, Student[]>>
  /**
   * Update a user by id
   * @param id Student id
   * @param user Student entity
   */
  update(
    id: string,
    user: StudentUpdateParams
  ): Promise<Either<StudentFailure, Student>>
  /**
   * Change the password of a user
   * @param id Student id
   * @param password Student password
   *
   */
  changePassword(
    id: string,
    password: string
  ): Promise<Either<StudentFailure, Student>>

  /**
   * Change state of a user to active or inactive
   * @param id Student id
   * @param isActive Student state
   */
  changeState(
    id: string,
    isActive: boolean
  ): Promise<Either<StudentFailure, Student>>

  /**
   * Change state of a user to archived or not archived
   * @param id Student id
   * @param isArchived Student state
   *
   */
  changeArchived(
    id: string,
    isArchived: boolean
  ): Promise<Either<StudentFailure, Student>>

  /**
   * Get users archived
   *
   */
  getArchived(
    filter: StudentFilterRequest
  ): Promise<Either<StudentFailure, Student[]>>
}
