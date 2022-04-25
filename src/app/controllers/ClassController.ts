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
  ClassActiveParams,
  ClassArchivedParams,
  ClassCreationParams,
  ClassResponseModel,
  ClassUpdateParams,
} from '../../contexts/keliarAcademy/classes/domain/ClassRequest'
import { TYPE } from '../ioc/Types'
import { ClassFilterRequest } from '../../contexts/keliarAcademy/classes/domain/ClassFilterRequest'
import { ClassService } from '../../contexts/keliarAcademy/classes/application/ClassService'

@Tags('Classes')
@Route('classes')
@injectable()
/**
 * @description Class Controller to serve the resources to the clients
 * @author Kennet Avila
 */
export class ClassController {
  private roleService: ClassService

  constructor(
    @inject(TYPE.Domain.Class.Application.Service) roleService: ClassService
  ) {
    this.roleService = roleService
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @SuccessResponse('200', 'Returns Classs Collection')
  @Get()
  public async get(@Query() name?: string): Promise<any[]> {
    const filters: ClassFilterRequest = {
      name,
    }
    return await this.roleService.get(filters)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @SuccessResponse('200', 'Returns Archived Classs Collection')
  @Get('/archived')
  public async getArchived(@Query() name?: string): Promise<any[]> {
    const filters: ClassFilterRequest = {
      name,
    }
    return await this.roleService.getArchivedClasss(filters)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Get('{id}')
  @SuccessResponse('200', 'Returns Class who matches the id')
  public async getById(id: string): Promise<ClassResponseModel> {
    return await this.roleService.getById(id)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Post()
  @SuccessResponse('201', 'Created')
  public async post(@Body() request: ClassCreationParams): Promise<void> {
    await this.roleService.createClass(request)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Put('{id}')
  @SuccessResponse('201', 'Updated')
  public async put(
    @Path() id: string,
    @Body() role: ClassUpdateParams
  ): Promise<void> {
    await this.roleService.updateClass(id, role)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Patch('{id}/set-archived')
  @SuccessResponse('204', 'Class Change Archived')
  public async setArchivedClass(
    @Path() id: string,
    @Body() archived: ClassArchivedParams
  ): Promise<void> {
    await this.roleService.setArchivedClass(id, archived)
  }
}
