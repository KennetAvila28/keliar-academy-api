/**
 *
 */

 export interface UserResponseModel {
  _id: string
  email: string
}

export interface UserCreationParams {
  names: string
  lastNames: string
  phone: string
  email: string
  password: string
  photo: string

}

export interface UserUpdateParams {
  names: string
  lastNames: string
  phone: string
  email: string
  photo: string
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

