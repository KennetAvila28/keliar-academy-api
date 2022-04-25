import { StudentRepository } from '../../students/domain/StudentRepository'
import { inject, injectable } from 'inversify'
import { TYPE } from '../../../../app/ioc/Types'
import { UserRepository } from '../../users/domain/UserRepository'
import { AuthParams, JWToken } from '../domain/AuthTypes'
import { GetAccessToken } from './GetAccessToken'
import { GetAccessTokenStudents } from './GetAccessTokenStudents'

@injectable()
export class AuthService {
  private repository: UserRepository
  private studentRepository: StudentRepository

  constructor(
    @inject(TYPE.Domain.User.Repository) repository: UserRepository,
    studentRepository: StudentRepository
  ) {
    this.repository = repository
    this.studentRepository = studentRepository
  }

  async login(auth: AuthParams): Promise<JWToken> {
    return await GetAccessToken.run(auth, this.repository)
  }
  async loginStudent(auth: AuthParams): Promise<JWToken> {
    return await GetAccessTokenStudents.run(auth, this.studentRepository)
  }
}
