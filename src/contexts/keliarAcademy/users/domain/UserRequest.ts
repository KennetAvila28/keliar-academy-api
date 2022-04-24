/**
 *
 */

import { Role } from '../../roles/domain/Role'
import { RoleResponseModel } from '../../roles/domain/RoleRequest'

export interface UserCreationParams {
  names: string
  lastNames: string
  phone: string
  email: string
  password: string
  photo: string
  roles: Role[]
}

export interface UserUpdateParams {
  names: string
  lastNames: string
  phone: string
  email: string
  photo: string
  roles: Role[]
}

export interface UserPasswordUpdateParams {
  password: string
}

export interface UserActiveParams {
  isActive: boolean
}

export interface UserArchivedParams {
  isArchived: boolean
}

export interface UserResponseModel {
  _id: string
  names: string
  lastNames: string
  email: string
  photo: string
  phone: string
  isActive: boolean
  isArchived: boolean
  createdAt: Date
  roles: RoleResponseModel[]
}
