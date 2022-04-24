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
} from 'tsoa'
import { inject, injectable } from 'inversify'
import {
  RoleActiveParams,
  RoleArchivedParams,
  RoleCreationParams,
  RoleResponseModel,
  RoleUpdateParams,
} from '../../contexts/keliarAcademy/roles/domain/RoleRequest'
import { TYPE } from '../ioc/Types'
import { RoleFilterRequest } from '../../contexts/keliarAcademy/roles/domain/RoleFilterRequest'
import { RoleService } from '../../contexts/keliarAcademy/roles/application/RoleService'

@Tags('Roles')
@Route('roles')
@injectable()
/**
 * @description Role Controller to serve the resources to the clients
 * @author Kennet Avila
 */
export class RoleController {
  private roleService: RoleService

  constructor(
    @inject(TYPE.Domain.Role.Application.Service) roleService: RoleService
  ) {
    this.roleService = roleService
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @SuccessResponse('200', 'Returns Roles Collection')
  @Get()
  public async get(@Query() name?: string): Promise<any[]> {
    const filters: RoleFilterRequest = {
      name,
    }
    return await this.roleService.get(filters)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @SuccessResponse('200', 'Returns Archived Roles Collection')
  @Get('/archived')
  public async getArchived(@Query() name?: string): Promise<any[]> {
    const filters: RoleFilterRequest = {
      name,
    }
    return await this.roleService.getArchivedRoles(filters)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Get('{id}')
  @SuccessResponse('200', 'Returns Role who matches the id')
  public async getById(id: string): Promise<RoleResponseModel> {
    return await this.roleService.getById(id)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Post()
  @SuccessResponse('201', 'Created')
  public async post(@Body() request: RoleCreationParams): Promise<void> {
    await this.roleService.createRole(request)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Put('{id}')
  @SuccessResponse('201', 'Updated')
  public async put(
    @Path() id: string,
    @Body() role: RoleUpdateParams
  ): Promise<void> {
    await this.roleService.updateRole(id, role)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Patch('{id}/set-active')
  @SuccessResponse('204', 'Role Change Active')
  public async setActiveRole(
    @Path() id: string,
    @Body() active: RoleActiveParams
  ): Promise<void> {
    await this.roleService.setActiveRole(id, active)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Patch('{id}/set-archived')
  @SuccessResponse('204', 'Role Change Archived')
  public async setArchivedRole(
    @Path() id: string,
    @Body() archived: RoleArchivedParams
  ): Promise<void> {
    await this.roleService.setArchivedRole(id, archived)
  }
}
