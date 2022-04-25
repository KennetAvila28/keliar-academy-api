import { inject, injectable } from 'inversify'
import { TYPE } from '../../../../app/ioc/Types'
import { ClassFilterRequest } from '../domain/ClassFilterRequest'
import { ClassRepository } from '../domain/ClassRepository'
import {
  ClassActiveParams,
  ClassArchivedParams,
  ClassCreationParams,
  ClassResponseModel,
  ClassUpdateParams,
} from '../domain/ClassRequest'
import { CreateClass } from './CreateClass'
import { GetArchivedClasses } from './GetArchivedClasses'
import { GetById } from './GetBydId'
import { GetClasses } from './GetClasses'
import { SetArchivedClass } from './SetArchivedClass'
import { UpdatedClass } from './UpdateClass'

@injectable()
export class ClassService {
  private repository: ClassRepository

  constructor(
    @inject(TYPE.Domain.Class.Repository) repository: ClassRepository
  ) {
    this.repository = repository
  }

  async get(filter: ClassFilterRequest): Promise<ClassResponseModel[]> {
    return await GetClasses.run(filter, this.repository)
  }

  async getById(id: string): Promise<ClassResponseModel> {
    return await GetById.run(id, this.repository)
  }

  async createClass(ClassRequest: ClassCreationParams): Promise<void> {
    await CreateClass.run(ClassRequest, this.repository)
  }

  async setArchivedClass(
    id: string,
    request: ClassArchivedParams
  ): Promise<void> {
    await SetArchivedClass.run(id, request, this.repository)
  }

  async updateClass(id: string, request: ClassUpdateParams): Promise<void> {
    await UpdatedClass.run(id, request, this.repository)
  }

  async getArchivedClasss(
    filters: ClassFilterRequest
  ): Promise<ClassResponseModel[]> {
    return await GetArchivedClasses.run(filters, this.repository)
  }
}
