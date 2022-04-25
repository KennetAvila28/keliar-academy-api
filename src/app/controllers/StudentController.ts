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
import { StudentService } from '../../contexts/keliarAcademy/students/application/StudentService'
import {
  StudentActiveParams,
  StudentArchivedParams,
  StudentCreationParams,
  StudentPasswordUpdateParams,
  StudentResponseModel,
  StudentUpdateParams,
} from '../../contexts/keliarAcademy/students/domain/StudentRequest'
import { UniqueId } from '../../contexts/shared/domain/valueobjects/UniqueId'
import { TYPE } from '../ioc/Types'
import { StudentFilterRequest } from '../../contexts/keliarAcademy/students/domain/StudentFilterRequest'

@Tags('Students')
@Route('students')
@injectable()
/**
 * @description Student Controller to serve the resources to the clients
 * @author Kennet Avila
 */
export class StudentController {
  private userService: StudentService

  constructor(
    @inject(TYPE.Domain.Student.Application.Service) userService: StudentService
  ) {
    this.userService = userService
  }

  @Security('jwt')
  @Response('401', 'Unathorized')
  @SuccessResponse('200', 'Returns Students Collection')
  @Get()
  public async get(
    @Query() names?: string,
    @Query() lastNames?: string,
    @Query() isActive?: boolean
  ): Promise<any[]> {
    const filters: StudentFilterRequest = {
      names,
      lastNames,
      isActive,
    }
    return await this.userService.get(filters)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Get('{id}')
  @SuccessResponse('200', 'Returns Student who matches the id')
  public async getById(id: string): Promise<StudentResponseModel> {
    return await this.userService.getById(new UniqueId(id))
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Post()
  @SuccessResponse('201', 'Created')
  public async post(@Body() request: StudentCreationParams): Promise<void> {
    await this.userService.createStudent(request)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Put('{id}')
  @SuccessResponse('201', 'Updated')
  public async put(
    @Path() id: string,
    @Body() user: StudentUpdateParams
  ): Promise<void> {
    await this.userService.updateStudent(id, user)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Patch('{id}/set-active')
  @SuccessResponse('204', 'Student Change Active')
  public async setActiveStudent(
    @Path() id: string,
    @Body() active: StudentActiveParams
  ): Promise<void> {
    await this.userService.setActiveStudent(id, active)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Patch('{id}/set-archived')
  @SuccessResponse('204', 'Student Change Archived')
  public async setArchivedStudent(
    @Path() id: string,
    @Body() archived: StudentArchivedParams
  ): Promise<void> {
    await this.userService.setArchivedStudent(id, archived)
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @Patch('{id}/change-password')
  @SuccessResponse('204', 'Updated Student Password')
  public async changePassword(
    @Path() id: string,
    @Body() passStudent: StudentPasswordUpdateParams
  ): Promise<void> {
    await this.userService.changePassword(id, passStudent)
  }
}
