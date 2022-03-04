/**
 * @description Users entity class
 * @author Kennet Avila
 */

import { BeforeInsert } from 'typeorm'
import { BaseEntity } from '../../../shared/domain/BaseEntity'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { UserEmail, UserName, UserPassword } from './UserValueObjects'
export class User implements BaseEntity {
  readonly _id: UniqueId
  readonly names: UserName
  readonly lastNames: UserName
  readonly email: UserEmail
  readonly password: UserPassword
  readonly createdAt: Date

  constructor(
    id: UniqueId,
    names: UserName,
    lastNames: UserName,
    email: UserEmail,
    password: UserPassword
  ) {
    this._id = id
    this.names = names
    this.lastNames = lastNames
    this.email = email
    this.password = password
    this.createdAt = new Date()
  }

  /**
   * Create a new User based on value objects
   * @param id
   * @param names
   * @param email
   * @param password
   * @returns {User} A new instances of a User entity
   */
  static create(
    id: UniqueId,
    names: UserName,
    lastNames: UserName,
    email: UserEmail,
    password: UserPassword
  ): User {
    const user = new User(id, names,lastNames, email, password)
    return user
  }

  toPrimitives(): any {
    return {
      _id: this._id.get(),
      names: this.names.get(),
      lastNames: this.names.get(),
      email: this.email.get(),
    }
  }
  
}
  // toString(): string {
  //   return `id: ${this._id.get()}, name: ${this.name.get()}, email: ${this.email.get()}`
  // }
