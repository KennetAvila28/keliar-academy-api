/**
 *
 */

 export interface RoleResponseModel {
  _id: string;
  email: string;
 }

export interface RoleCreationParams {
  name: string;
}

export interface RoleUpdateParams {
  name: string;
}

export interface RolePasswordUpdateParams {
  password: string
}

export interface RoleActiveParams {
  isActive: boolean
}

export interface RoleArchivedParams {
  isArchived: boolean
}

