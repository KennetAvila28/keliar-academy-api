/**
 *
 */

import {
  Route,
  Tags,
  Get,
  SuccessResponse,
  Security,
  Response,
} from '@tsoa/runtime'
import { inject, injectable } from 'inversify'
import { PermissionService } from '../../contexts/keliarAcademy/permissions/application/PermissionService'
import { TYPE } from '../ioc/Types'

@Tags('Permissions')
@Route('permissions')
@injectable()
export class PermissionsController {
  private PermissionService: PermissionService
  constructor(
    @inject(TYPE.Domain.Permission.Application.Service)
    PermissionService: PermissionService
  ) {
    this.PermissionService = PermissionService
  }
  @Security('jwt')
  @Response('401', 'Unathorized')
  @SuccessResponse('200', 'Returns Permission Collection')
  @Get()
  public async getPermissions(): Promise<any[]> {
    return await this.PermissionService.get()
  }
}
