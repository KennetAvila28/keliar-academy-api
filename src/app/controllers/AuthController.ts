/**
 * @description Auth Controller to manage api authentication
 * @author Luis Palmas
 */

import {
  Body,
  Post,
  Route,
  SuccessResponse,
  Tags,
  Response,
} from '@tsoa/runtime'
import { inject, injectable } from 'inversify'
import { AuthService } from '../../contexts/keliarAcademy/auth/application/AuthService'
import {
  AuthParams,
  JWToken,
} from '../../contexts/keliarAcademy/auth/domain/AuthTypes'
import { TYPE } from '../ioc/Types'
// import { UserService } from '../../contexts/khronox/users/application/UserService'
// import { ProvideSingleton } from '../../ioc/ioc'
// import { TYPE } from '../../ioc/Types'

@Tags('auth')
@Route('auth')
@injectable()
// @ProvideSingleton(TYPE.Domain.Auth.Application.Controller)
export class AuthController {
  private authService: AuthService
  constructor(
    @inject(TYPE.Domain.Auth.Application.Service) authService: AuthService
  ) {
    this.authService = authService
  }

  @SuccessResponse('200', 'OK')
  @Response('401', 'Unathorized')
  @Post()
  public async post(@Body() request: AuthParams): Promise<JWToken> {
    return this.authService.login(request)
  }
}
