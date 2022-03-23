/**
 * @description Roles entity class
 * @author Kennet Avila
 */

import { v4 } from 'uuid'
import { BaseEntity } from '../../../shared/domain/BaseEntity'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { RoleCreationParams } from './RoleRequest'
export class Role implements BaseEntity {
  readonly _id: UniqueId;
  readonly name: string;
  readonly isActive:boolean;
  readonly isArchived:boolean;
  readonly createdAt: Date;

  constructor(
    id: UniqueId,
    name: string,
  ) {
    this._id = id;
    this.createdAt = new Date();
    this.isActive = true;
    this.isArchived = false;
    this.name = name;
  }

  /**
   * Create a new Role based on value objects
   * @param {RoleCreationParams} role
   * @returns {Role} A new instances of a Role entity
   */
  static create(role: RoleCreationParams): Role {
    return new Role(new UniqueId(v4()),
      role.name);
  }



  toPrimitives(): any {
    return {
      _id: this._id.get(),
      name: this.name,
      isActive: this.isActive,
      isArchived: this.isArchived,
      createdAt: this.createdAt,
    };
  }

}
  // toString(): string {
  //   return `id: ${this._id.get()}, name: ${this.name.get()}, email: ${this.email.get()}`
  // }
