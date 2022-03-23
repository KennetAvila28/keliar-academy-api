/**
 * @description Auth Controller to manage api authentication
 * @author Luis Palmas
 */

import { Get, Route, Tags } from '@tsoa/runtime'
import { injectable } from 'inversify'
// import { UserService } from '../../contexts/khronox/users/application/UserService'
// import { ProvideSingleton } from '../../ioc/ioc'
// import { TYPE } from '../../ioc/Types'

@Tags('auth')
@Route('auth')
@injectable()
// @ProvideSingleton(TYPE.Domain.Auth.Application.Controller)
export class AuthController {
  // @inject(TYPE.Domain.User.Application.Service)
  // private userService: UserService | undefined

  @Get()
  public async get() {
    return 'empty';
  }
}
