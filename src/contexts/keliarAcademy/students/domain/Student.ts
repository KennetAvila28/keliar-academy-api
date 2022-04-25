import { Class } from '../../classes/domain/Class'
import { Either, left, right } from '../../../shared/core/Either'
import { BaseEntity } from '../../../shared/domain/BaseEntity'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { StudentFailure } from './StudentFailures'
import { StudentResponseModel } from './StudentRequest'
import { StudentEmail, StudentPassword } from './StudentValueObjects'
export class Student implements BaseEntity {
  readonly _id: string
  readonly email: string
  readonly password: string
  readonly names: string
  readonly lastNames: string
  readonly phone: string
  readonly photo: string
  readonly isActive: boolean
  readonly isArchived: boolean
  readonly createdAt: Date
  readonly classes: Class[]

  constructor(
    id: string,
    email: string,
    password: string,
    names: string,
    lastNames: string,
    phone: string,
    photo: string,
    classes: Class[]
  ) {
    this._id = id
    this.email = email
    this.password = password
    this.createdAt = new Date()
    this.isActive = true
    this.isArchived = false
    this.names = names
    this.lastNames = lastNames
    this.phone = phone
    this.photo = photo
    this.classes = classes
  }

  /**
   * Create a new Student based on value objects
   * @param id
   * @param names
   * @param email
   * @param password
   * @param names
   * @param lastNames
   * @param phone
   * @param photo
   *
   * @returns {Student} A new instances of a Student entity
   */
  static create(
    id: UniqueId,
    email: StudentEmail,
    password: StudentPassword,
    names: string,
    lastNames: string,
    phone: string,
    photo: string,
    classes: Class[]
  ): Either<StudentFailure, Student> {
    if (!id.isValid()) return left('INVALID_USER_ID')
    if (!email.isValid()) return left('INVALID_EMAIL')
    if (!password.isValid()) return left('INVALID_PASSWORD')
    const user = new Student(
      id.get(),
      email.get(),
      password.get(),
      names,
      lastNames,
      phone,
      photo,
      classes
    )
    return right(user)
  }

  toPrimitives(): StudentResponseModel {
    return {
      _id: this._id,
      names: this.names,
      lastNames: this.lastNames,
      email: this.email,
      phone: this.phone,
      photo: this.photo,
      isActive: this.isActive,
      isArchived: this.isArchived,
      createdAt: this.createdAt,
      classes: this.classes ? this.classes.map((r) => r.toPrimitives()) : [],
    }
  }
}
// toString(): string {
//   return `id: ${this._id.get()}, name: ${this.name.get()}, email: ${this.email.get()}`
// }
