import {
  Body,
  Get,
  Post,
  Route,
  SuccessResponse,
  Tags,
  Put,
  Query,
  Path,
  Patch,
  Security,
  Response,
} from '@tsoa/runtime'
import { inject, injectable } from 'inversify'
import { UserService } from '../../contexts/keliarAcademy/users/application/UserService'
import {
  UserActiveParams,
  UserArchivedParams,
  UserCreationParams,
  UserPasswordUpdateParams,
  UserResponseModel,
  UserUpdateParams,
} from '../../contexts/keliarAcademy/users/domain/UserRequest'
import { UniqueId } from '../../contexts/shared/domain/valueobjects/UniqueId'
import { TYPE } from '../ioc/Types'
import { UserFilterRequest } from '../../contexts/keliarAcademy/users/domain/UserFilterRequest'

@Tags('Users')
@Route('users')
@injectable()
/**
 * @description User Controller to serve the resources to the clients
 * @author Kennet Avila
 */
export class UserController {
  private userService: UserService

  constructor(
    @inject(TYPE.Domain.User.Application.Service) userService: UserService
  ) {
    this.userService = userService
  }

  @Security('jwt')
  @Response('401', 'Unathorized')
  @SuccessResponse('200', 'Returns Users Collection')
  @Get()
  public async get(
    @Query() names?: string,
    @Query() lastNames?: string,
    @Query() isActive?: boolean
  ): Promise<any[]> {
    const filters: UserFilterRequest = {
      names,
      lastNames,
      isActive,
    }
    return await this.userService.get(filters)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @SuccessResponse('200', 'Returns Archived Users Collection')
  @Get('/archived')
  public async getArchived(
    @Query() names?: string,
    @Query() lastNames?: string,
    @Query() isActive?: boolean
  ): Promise<UserResponseModel[]> {
    const filters: UserFilterRequest = {
      names,
      lastNames,
      isActive,
    }
    return await this.userService.getArchivedUsers(filters)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Get('{id}')
  @SuccessResponse('200', 'Returns User who matches the id')
  public async getById(id: string): Promise<UserResponseModel> {
    return await this.userService.getById(new UniqueId(id))
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Post()
  @SuccessResponse('201', 'Created')
  public async post(@Body() request: UserCreationParams): Promise<void> {
    await this.userService.createUser(request)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Put('{id}')
  @SuccessResponse('201', 'Updated')
  public async put(
    @Path() id: string,
    @Body() user: UserUpdateParams
  ): Promise<void> {
    await this.userService.updateUser(id, user)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Patch('{id}/set-active')
  @SuccessResponse('204', 'User Change Active')
  public async setActiveUser(
    @Path() id: string,
    @Body() active: UserActiveParams
  ): Promise<void> {
    await this.userService.setActiveUser(id, active)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Patch('{id}/set-archived')
  @SuccessResponse('204', 'User Change Archived')
  public async setArchivedUser(
    @Path() id: string,
    @Body() archived: UserArchivedParams
  ): Promise<void> {
    await this.userService.setArchivedUser(id, archived)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Patch('{id}/change-password')
  @SuccessResponse('204', 'Updated User Password')
  public async changePassword(
    @Path() id: string,
    @Body() passUser: UserPasswordUpdateParams
  ): Promise<void> {
    await this.userService.changePassword(id, passUser)
  }
}
