/**
 *
 */

import { ClassResponseModelWithOutStudents } from '../../classes/domain/ClassRequest'
import { Class } from '../../classes/domain/Class'

export interface StudentCreationParams {
  names: string
  lastNames: string
  phone: string
  email: string
  password: string
  photo: string
  Classes: Class[]
}

export interface StudentUpdateParams {
  names: string
  lastNames: string
  phone: string
  email: string
  photo: string
  Classes: Class[]
}

export interface StudentPasswordUpdateParams {
  password: string
}

export interface StudentActiveParams {
  isActive: boolean
}

export interface StudentArchivedParams {
  isArchived: boolean
}

export interface StudentResponseModel {
  _id: string
  names: string
  lastNames: string
  email: string
  photo: string
  phone: string
  isActive: boolean
  isArchived: boolean
  createdAt: Date
  classes: ClassResponseModelWithOutStudents[]
}
export interface StudentResponseModelWithOutClass {
  _id: string
  names: string
  lastNames: string
  email: string
  photo: string
  phone: string
  isActive: boolean
  isArchived: boolean
  createdAt: Date
}
