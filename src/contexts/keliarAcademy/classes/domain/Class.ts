import { Student } from '../../students/domain/Student'
import { Either, left, right } from '../../../shared/core/Either'
import { BaseEntity } from '../../../shared/domain/BaseEntity'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { ClassFailure } from './ClassFailures'
import { ClassResponseModel } from './ClassRequest'
export class Class implements BaseEntity {
  readonly _id: string
  readonly name: string
  readonly isActive: boolean
  readonly isArchived: boolean
  readonly createdAt: Date
  readonly students?: Student[]
  readonly tasks?: string[]
  constructor(id: string, name: string) {
    this._id = id
    this.createdAt = new Date()
    this.isActive = true
    this.isArchived = false
    this.name = name
  }

  /**
   * Create a new Class based on value objects
   * @param {ClassCreationParams} role
   * @returns {Class} A new instances of a Class entity
   */
  static create(id: UniqueId, name: string): Either<ClassFailure, Class> {
    if (!id.isValid()) return left('INVALID_ROLE_ID')
    const role = new Class(id.get(), name)
    return right(role)
  }

  toPrimitives(): ClassResponseModel {
    return {
      _id: this._id,
      name: this.name,
      isActive: this.isActive,
      isArchived: this.isArchived,
      createdAt: this.createdAt,
      students: this.students ? this.students.map((p) => p.toPrimitives()) : [],
      // tasks: this.tasks ? this.tasks.map((p) => p.toPrimitives()) : [],
    }
  }
}
// toString(): string {
//   return `id: ${this._id.get()}, name: ${this.name.get()}, email: ${this.email.get()}`
// }
