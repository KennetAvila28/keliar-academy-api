/**
 * @description Users entity class
 * @author Kennet Avila
 */

import { BeforeInsert } from 'typeorm'
import { v4 } from 'uuid'
import { BaseEntity } from '../../../shared/domain/BaseEntity'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { UserCreationParams } from './UserRequest'
import { UserEmail, UserName, UserPassword } from './UserValueObjects'
export class User implements BaseEntity {
  readonly _id: UniqueId
  readonly email: UserEmail
  readonly password: UserPassword
  readonly names: string
  readonly lastNames: string
  readonly phone: string
  readonly photo: string
  readonly isActive:boolean
  readonly isArchived:boolean
  readonly createdAt: Date

  constructor(
    id: UniqueId,
    email: UserEmail,
    password: UserPassword,
    names: string,
    lastNames: string,
    phone: string,
    photo: string
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
  }

  /**
   * Create a new User based on value objects
   * @param {UserCreationParams} user
   * @returns {User} A new instances of a User entity
   */
  static create(user: UserCreationParams): User {
    return new User(new UniqueId(v4()),
      new UserEmail(user.email),
      new UserPassword(user.password),
      user.names, 
      user.lastNames,
      user.phone,
      user.photo)
  }

  toPrimitives(): any {
    return {
      _id: this._id.get(),
      names: this.names,
      lastNames: this.lastNames,
      email: this.email.get(),
      phone: this.phone,
      photo: this.photo,
      isActive: this.isActive,
      isArchived: this.isArchived,
      createdAt: this.createdAt,
    }
  }

}
  // toString(): string {
  //   return `id: ${this._id.get()}, name: ${this.name.get()}, email: ${this.email.get()}`
  // }
