
import { Body, Get, Post, Route, SuccessResponse, Tags, Put, Query, Path, Patch } from "tsoa"
import { inject, injectable } from "inversify"
import { UserService } from "../../contexts/keliarAcademy/users/application/UserService"
import { UserActiveParams, UserArchivedParams, UserCreationParams, UserPasswordUpdateParams, UserUpdateParams } from "../../contexts/keliarAcademy/users/domain/UserRequest"
import { UniqueId } from "../../contexts/shared/domain/valueobjects/UniqueId"
import { TYPE } from "../ioc/Types"
import { UserFilterRequest } from "../../contexts/keliarAcademy/users/domain/UserFilterRequest"

@Tags("Users")
@Route("users")
@injectable()
/**
* @description User Controller to serve the resources to the clients
* @author Kennet Avila
*/
export class UserController {
  private userService: UserService;

  constructor(
    @inject(TYPE.Domain.User.Application.Service) userService: UserService
  ) {
    this.userService = userService;
  }

  @SuccessResponse("200", "Returns Users Collection")
  @Get()
  public async get(
    @Query() names?: string,
    @Query() lastNames?: string,
    @Query() isActive?: boolean
  ): Promise<any[]> {
    const filters: UserFilterRequest = {
      names,
      lastNames,
      isActive
    };
    return await this.userService.get(filters);
  }

  @SuccessResponse('200', 'Returns Archived Users Collection')
  @Get('/archived')
  public async getArchived(
    @Query() names?: string,
    @Query() lastNames?: string,
    @Query() isActive?: boolean
  ): Promise<any[]> {
    const filters: UserFilterRequest = {
      names,
      lastNames,
      isActive
    }
    return await this.userService.getArchivedUsers(filters)
  }

  @Get("{id}")
  @SuccessResponse("200", "Returns User who matches the id")
  public async getById(id: string): Promise<any> {
    return await this.userService.getById(new UniqueId(id));
  }

  @Post()
  @SuccessResponse("201", "Created")
  public async post(@Body() request: UserCreationParams): Promise<any> {
    return await this.userService.createUser(request);
  }

  @Put("{id}")
  @SuccessResponse("201", "Updated")
  public async put(@Path() id: string, @Body() user: UserUpdateParams): Promise<any> {
    return await this.userService.updateUser(id, user);
  }

  @Patch("{id}/set-active")
  @SuccessResponse("201", "User Change Active")
  public async setActiveUser(@Path() id: string, @Body() active: UserActiveParams): Promise<any> {
    return await this.userService.setActiveUser(id, active);
  }

  @Patch("{id}/set-archived")
  @SuccessResponse("201", "User Change Archived")
  public async setArchivedUser(@Path() id: string, @Body() archived: UserArchivedParams): Promise<any> {
    return await this.userService.setArchivedUser(id, archived);
  }

  @Patch("{id}/change-password")
  @SuccessResponse("201", "Updated User Password")
  public async changePassword(@Path() id: string, @Body() passUser: UserPasswordUpdateParams): Promise<any> {
    return await this.userService.changePassword(id, passUser);
  }



}
