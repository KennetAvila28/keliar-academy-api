import { inject, injectable } from 'inversify'
import { TYPE } from '../../../../app/ioc/Types'
import { UniqueId } from '../../../shared/domain/valueobjects/UniqueId'
import { StudentFilterRequest } from '../domain/StudentFilterRequest'
import { StudentRepository } from '../domain/StudentRepository'
import {
  StudentActiveParams,
  StudentArchivedParams,
  StudentCreationParams,
  StudentPasswordUpdateParams,
  StudentResponseModel,
  StudentUpdateParams,
} from '../domain/StudentRequest'
import { ChangePasswordStudent } from './ChangePasswordStudent'
import { CreateStudent } from './CreateStudent'
import { GetById } from './GetBydId'
import { GetStudents } from './GetStudents'
import { SetActiveStudent } from './SetActiveStudent'
import { SetArchivedStudent } from './SetArchivedStudent'
import { UpdatedStudent } from './UpdateStudent'

@injectable()
export class StudentService {
  private repository: StudentRepository

  constructor(
    @inject(TYPE.Domain.Student.Repository) repository: StudentRepository
  ) {
    this.repository = repository
  }

  async get(filter: StudentFilterRequest): Promise<StudentResponseModel[]> {
    return await GetStudents.run(filter, this.repository)
  }

  async getById(id: UniqueId): Promise<StudentResponseModel> {
    return await GetById.run(id, this.repository)
  }

  async createStudent(userRequest: StudentCreationParams): Promise<void> {
    await CreateStudent.run(userRequest, this.repository)
  }

  async setArchivedStudent(
    id: string,
    request: StudentArchivedParams
  ): Promise<void> {
    await SetArchivedStudent.run(new UniqueId(id), request, this.repository)
  }

  async setActiveStudent(
    id: string,
    request: StudentActiveParams
  ): Promise<void> {
    await SetActiveStudent.run(new UniqueId(id), request, this.repository)
  }

  async changePassword(
    id: string,
    request: StudentPasswordUpdateParams
  ): Promise<void> {
    await ChangePasswordStudent.run(new UniqueId(id), request, this.repository)
  }

  async updateStudent(id: string, request: StudentUpdateParams): Promise<void> {
    await UpdatedStudent.run(new UniqueId(id), request, this.repository)
  }
}
