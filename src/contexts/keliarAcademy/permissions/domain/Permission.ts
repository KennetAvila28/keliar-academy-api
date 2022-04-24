import { PermissionResponseModel } from '../../roles/domain/RoleRequest'
import { BaseEntity } from './../../../shared/domain/BaseEntity'
export class Permission implements BaseEntity {
  readonly _id: string
  readonly name: string
  readonly description: string
  readonly module: string

  constructor(id: string, name: string, description: string, module: string) {
    this._id = id
    this.name = name
    this.description = description
    this.module = module
  }

  toPrimitives(): PermissionResponseModel {
    return {
      _id: this._id,
      name: this.name,
      description: this.description,
      module: this.module,
    }
  }
  // toString(): string {
  //     throw new Error('Method not implemented.');
  // }
}
