
import { Body, Get, Post, Route, SuccessResponse, Tags, Put, Query, Path, Patch } from "tsoa"
import { inject, injectable } from "inversify"
import { RoleActiveParams, RoleArchivedParams, RoleCreationParams, RolePasswordUpdateParams, RoleUpdateParams } from "../../contexts/keliarAcademy/roles/domain/RoleRequest"
import { UniqueId } from "../../contexts/shared/domain/valueobjects/UniqueId"
import { TYPE } from "../ioc/Types"
import { RoleFilterRequest } from "../../contexts/keliarAcademy/roles/domain/RoleFilterRequest"
import { RoleService } from "../../contexts/keliarAcademy/roles/application/RoleService"

@Tags("Roles")
@Route("roles")
@injectable()
/**
* @description Role Controller to serve the resources to the clients
* @author Kennet Avila
*/
export class RoleController {
  private roleService: RoleService;

  constructor(
    @inject(TYPE.Domain.Role.Application.Service) roleService: RoleService
  ) {
    this.roleService = roleService;
  }

  @SuccessResponse("200", "Returns Roles Collection")
  @Get()
  public async get(
    @Query() name?: string,
  ): Promise<any[]> {
    const filters: RoleFilterRequest = {
      name
    };
    return await this.roleService.get(filters);
  }

  @SuccessResponse('200', 'Returns Archived Roles Collection')
  @Get('/archived')
  public async getArchived(
    @Query() name?: string,
  ): Promise<any[]> {
    const filters: RoleFilterRequest = {
      name
    }
    return await this.roleService.getArchivedRoles(filters)
  }

  @Get("{id}")
  @SuccessResponse("200", "Returns Role who matches the id")
  public async getById(id: string): Promise<any> {
    return await this.roleService.getById(new UniqueId(id));
  }

  @Post()
  @SuccessResponse("201", "Created")
  public async post(@Body() request: RoleCreationParams): Promise<any> {
    return await this.roleService.createRole(request);
  }

  @Put("{id}")
  @SuccessResponse("201", "Updated")
  public async put(@Path() id: string, @Body() role: RoleUpdateParams): Promise<any> {
    return await this.roleService.updateRole(id, role);
  }

  @Patch("{id}/set-active")
  @SuccessResponse("201", "Role Change Active")
  public async setActiveRole(@Path() id: string, @Body() active: RoleActiveParams): Promise<any> {
    return await this.roleService.setActiveRole(id, active);
  }

  @Patch("{id}/set-archived")
  @SuccessResponse("201", "Role Change Archived")
  public async setArchivedRole(@Path() id: string, @Body() archived: RoleArchivedParams): Promise<any> {
    return await this.roleService.setArchivedRole(id, archived);
  }

}
