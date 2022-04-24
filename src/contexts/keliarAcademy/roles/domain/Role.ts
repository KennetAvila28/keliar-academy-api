import { Either, left, right } from '../../../shared/core/Either'
import { BaseEntity } from '../../../shared/domain/BaseEntity'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { Permission } from '../../permissions/domain/Permission'
import { RoleFailure } from './RoleFailures'
import { RoleResponseModel } from './RoleRequest'
export class Role implements BaseEntity {
  readonly _id: string
  readonly name: string
  readonly isActive: boolean
  readonly isArchived: boolean
  readonly createdAt: Date
  readonly permissions: Permission[]

  constructor(id: string, name: string, permissions: Permission[]) {
    this._id = id
    this.createdAt = new Date()
    this.isActive = true
    this.isArchived = false
    this.name = name
    this.permissions = permissions
  }

  /**
   * Create a new Role based on value objects
   * @param {RoleCreationParams} role
   * @returns {Role} A new instances of a Role entity
   */
  static create(
    id: UniqueId,
    name: string,
    permissions: Permission[]
  ): Either<RoleFailure, Role> {
    if (!id.isValid()) return left('INVALID_ROLE_ID')
    const role = new Role(id.get(), name, permissions)
    return right(role)
  }

  toPrimitives(): RoleResponseModel {
    return {
      _id: this._id,
      name: this.name,
      isActive: this.isActive,
      isArchived: this.isArchived,
      createdAt: this.createdAt,
      permissions: this.permissions
        ? this.permissions.map((p) => p.toPrimitives())
        : [],
    }
  }
}
// toString(): string {
//   return `id: ${this._id.get()}, name: ${this.name.get()}, email: ${this.email.get()}`
// }
