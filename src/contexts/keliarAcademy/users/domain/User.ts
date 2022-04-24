import { Either, left, right } from '../../../shared/core/Either'
import { BaseEntity } from '../../../shared/domain/BaseEntity'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { Role } from '../../roles/domain/Role'
import { UserFailure } from './UserFailures'
import { UserResponseModel } from './UserRequest'
import { UserEmail, UserPassword } from './UserValueObjects'
export class User implements BaseEntity {
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
  readonly roles: Role[]

  constructor(
    id: string,
    email: string,
    password: string,
    names: string,
    lastNames: string,
    phone: string,
    photo: string,
    roles: Role[]
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
    this.roles = roles
  }

  /**
   * Create a new User based on value objects
   * @param id
   * @param names
   * @param email
   * @param password
   * @param names
   * @param lastNames
   * @param phone
   * @param photo
   *
   * @returns {User} A new instances of a User entity
   */
  static create(
    id: UniqueId,
    email: UserEmail,
    password: UserPassword,
    names: string,
    lastNames: string,
    phone: string,
    photo: string,
    roles: Role[]
  ): Either<UserFailure, User> {
    if (!id.isValid()) return left('INVALID_USER_ID')
    if (!email.isValid()) return left('INVALID_EMAIL')
    if (!password.isValid()) return left('INVALID_PASSWORD')
    const user = new User(
      id.get(),
      email.get(),
      password.get(),
      names,
      lastNames,
      phone,
      photo,
      roles
    )
    return right(user)
  }

  toPrimitives(): UserResponseModel {
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
      roles: this.roles ? this.roles.map((r) => r.toPrimitives()) : [],
    }
  }
}
// toString(): string {
//   return `id: ${this._id.get()}, name: ${this.name.get()}, email: ${this.email.get()}`
// }
