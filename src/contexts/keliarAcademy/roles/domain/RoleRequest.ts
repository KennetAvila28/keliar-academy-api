import { Permission } from '../../permissions/domain/Permission'

/**
 *
 */
export interface RoleCreationParams {
  name: string
  permissions: Permission[]
}
export interface PermissionResponseModel {
  _id: string
  name: string
  description: string
  module: string
}
export interface RoleUpdateParams {
  name: string
  permissions: Permission[]
}

export interface RoleActiveParams {
  isActive: boolean
}

export interface RoleArchivedParams {
  isArchived: boolean
}

export interface RoleResponseModel {
  _id: string
  name: string
  isActive: boolean
  isArchived: boolean
  createdAt: Date
  permissions: PermissionResponseModel[]
}
