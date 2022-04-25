/**
 * IoC module for managing dependency injection
 * @description
 * @author Kennet Avila
 */

import { Container, AsyncContainerModule } from 'inversify'
import { TYPE } from './Types'
import { UserRepository } from '../../contexts/keliarAcademy/users/domain/UserRepository'
import { TypeOrmUserRepository } from '../../contexts/keliarAcademy/users/infrastructure/persistence/TypeOrmUserRepository'
import { UserService } from '../../contexts/keliarAcademy/users/application/UserService'
import { TypeOrmClient } from '../../contexts/shared/infrastructure/persistence/typeorm/TypeOrmClient'
import { RoleRepository } from '../../contexts/keliarAcademy/roles/domain/RoleRepository'
import { TypeOrmRoleRepository } from '../../contexts/keliarAcademy/roles/infrastructure/persistence/TypeOrmRoleRepository'
import { RoleService } from './../../contexts/keliarAcademy/roles/application/RoleService'
import { AuthService } from '../../contexts/keliarAcademy/auth/application/AuthService'
import { PermissionService } from '../../contexts/keliarAcademy/permissions/application/PermissionService'
import { PermissionRepository } from '../../contexts/keliarAcademy/permissions/domain/PermissionRepository'
import { TypeOrmPermissionRepository } from '../../contexts/keliarAcademy/permissions/infrastructure/persistence/TypeOrmPermissionRepository'
import { TypeOrmClassRepository } from '../../contexts/keliarAcademy/classes/infrastructure/persistence/TypeOrmClassRepository'
import { ClassRepository } from '../../contexts/keliarAcademy/classes/domain/ClassRepository'
import { ClassService } from '../../contexts/keliarAcademy/classes/application/ClassService'
import { StudentService } from '../../contexts/keliarAcademy/students/application/StudentService'
import { StudentRepository } from '../../contexts/keliarAcademy/students/domain/StudentRepository'
import { TypeOrmStudentRepository } from '../../contexts/keliarAcademy/students/infrastructure/persistence/TypeOrmStudentRepository'
import {
  AuthController,
  ClassController,
  PermissionsController,
  RoleController,
  StudentController,
  UserController,
} from '../controllers'

export const bindings = new AsyncContainerModule(async (bind) => {
  await new TypeOrmClient().getTypeOrmConnection()
  bind<AuthService>(TYPE.Domain.Auth.Application.Service)
    .to(AuthService)
    .inSingletonScope()

  // binding services and repositories por enntity
  bind<UserRepository>(TYPE.Domain.User.Repository)
    .to(TypeOrmUserRepository)
    .inSingletonScope()

  bind<UserService>(TYPE.Domain.User.Application.Service)
    .to(UserService)
    .inSingletonScope()

  bind<RoleRepository>(TYPE.Domain.Role.Repository)
    .to(TypeOrmRoleRepository)
    .inSingletonScope()

  bind<RoleService>(TYPE.Domain.Role.Application.Service)
    .to(RoleService)
    .inSingletonScope()
  bind<PermissionService>(TYPE.Domain.Permission.Application.Service)
    .to(PermissionService)
    .inSingletonScope()
  bind<PermissionRepository>(TYPE.Domain.Permission.Repository)
    .to(TypeOrmPermissionRepository)
    .inSingletonScope()
  bind<ClassService>(TYPE.Domain.Class.Application.Service)
    .to(ClassService)
    .inSingletonScope()
  bind<ClassRepository>(TYPE.Domain.Class.Repository)
    .to(TypeOrmClassRepository)
    .inSingletonScope()
  bind<StudentService>(TYPE.Domain.Student.Application.Service)
    .to(StudentService)
    .inSingletonScope()
  bind<StudentRepository>(TYPE.Domain.Student.Repository)
    .to(TypeOrmStudentRepository)
    .inSingletonScope()
  // Add a bindig for each controller
  bind<UserController>(UserController).to(UserController).inSingletonScope()
  bind<RoleController>(RoleController).to(RoleController).inSingletonScope()
  bind<AuthController>(AuthController).to(AuthController).inSingletonScope()
  bind<PermissionsController>(PermissionsController)
    .to(PermissionsController)
    .inSingletonScope()
  bind<StudentController>(StudentController)
    .to(StudentController)
    .inSingletonScope()
  bind<ClassController>(ClassController).to(ClassController).inSingletonScope()
})

const iocContainer = new Container()
iocContainer.loadAsync(bindings)

export { iocContainer }
