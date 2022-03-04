/**
 * @description User Controller to serve the resources to the clients
 * @author Luis Palmas
 */
import { Body, Get, Post, Route, SuccessResponse, Tags } from '@tsoa/runtime'
import { inject, injectable } from 'inversify'
import { UserService } from '../../contexts/keliarAcademy/users/application/UserService'
import { UserCreationParams } from '../../contexts/keliarAcademy/users/domain/UserRequest'
import { UniqueId } from '../../contexts/shared/domain/valueobjects/UniqueId'
import { TYPE } from '../ioc/Types'

@Tags('Users')
@Route('users')
@injectable()
export class UserController {
  private userService: UserService

  constructor(
    @inject(TYPE.Domain.User.Application.Service) userService: UserService
  ) {
    this.userService = userService
  }

  @SuccessResponse('200', 'Returns Users Collection')
  @Get()
  public async get(): Promise<any[]> {
    return await this.userService.get()
  }

  @Get('{id}')
  @SuccessResponse('200', 'Returns User who matches the id')
  public async getById(id: string): Promise<any> {
    return await this.userService.getById(new UniqueId(id))
  }

  @Post()
  @SuccessResponse('201', 'Created')
  public async post(@Body() request: UserCreationParams): Promise<void> {
    await this.userService.createUser(request)
  }
}
