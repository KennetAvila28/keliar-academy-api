import { fold, getOrElse } from '../../../shared/core/Either'
import { StudentRepository } from '../../students/domain/StudentRepository'
import { AuthParams, JWToken } from '../domain/AuthTypes'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
const secret = process.env.JWT_SECRET || 'my@#$secret'
export class GetAccessTokenStudents {
  static async run(
    auth: AuthParams,
    studentRepository: StudentRepository
  ): Promise<JWToken> {
    const result = await studentRepository.searchByEmail(auth.email)

    const _user = getOrElse(result, (err) => {
      throw new Error(err)
    })
    if (!(await compare(auth.password, _user.password)))
      throw new Error('INVALID_PASSWORD')

    const token = {
      token: sign(
        {
          id: _user._id,
          first_name: _user.names,
          last_name: _user.lastNames,
          email: _user.email,
          class: _user.classes,
        },
        secret,
        { expiresIn: '24h' }
      ),
    }
    return fold(
      result,
      (err) => {
        throw new Error(err)
      },
      () => token
    )
  }
}
