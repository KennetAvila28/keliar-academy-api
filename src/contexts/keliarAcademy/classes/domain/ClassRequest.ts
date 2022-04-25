import { StudentResponseModelWithOutClass } from '../../students/domain/StudentRequest'
/**
 *
 */
export interface ClassCreationParams {
  name: string
}
export interface ClassUpdateParams {
  name: string
}

export interface ClassActiveParams {
  isActive: boolean
}

export interface ClassArchivedParams {
  isArchived: boolean
}

export interface ClassResponseModel {
  _id: string
  name: string
  isActive: boolean
  isArchived: boolean
  createdAt: Date
  students: StudentResponseModelWithOutClass[]
}
export interface ClassResponseModelWithOutStudents {
  _id: string
  name: string
  isActive: boolean
  isArchived: boolean
  createdAt: Date
}
