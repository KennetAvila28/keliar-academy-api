/**
 * IoC module for managing dependency injection
 * @description
 * @author Luis Palma
 */

import { Container, AsyncContainerModule } from 'inversify'
import { TYPE } from './Types'
import { UserRepository } from '../../contexts/keliarAcademy/users/domain/UserRepository'
import { TypeOrmUserRepository } from '../../contexts/keliarAcademy/users/infrastructure/persistence/TypeOrmUserRepository'
import { UserService } from '../../contexts/keliarAcademy/users/application/UserService'
import { TypeOrmClient } from '../../contexts/shared/infrastructure/persistence/typeorm/TypeOrmClient'
import { UserController } from '../controllers/UserController'
import { AuthController } from '../controllers/AuthController'
import { RoleRepository } from '../../contexts/keliarAcademy/roles/domain/RoleRepository'
import { TypeOrmRoleRepository } from '../../contexts/keliarAcademy/roles/infrastructure/persistence/TypeOrmRoleRepository'
import { RoleController } from './../controllers/RoleController';
import { RoleService } from './../../contexts/keliarAcademy/roles/application/RoleService';

export const bindings = new AsyncContainerModule(async (bind) => {
  await new TypeOrmClient().getTypeOrmConnection();

  // binding services and repositories por enntity
  bind<UserRepository>(TYPE.Domain.User.Repository)
    .to(TypeOrmUserRepository)
    .inSingletonScope();

  bind<UserService>(TYPE.Domain.User.Application.Service)
    .to(UserService)
    .inSingletonScope();

  bind<RoleRepository>(TYPE.Domain.Role.Repository)
    .to(TypeOrmRoleRepository)
    .inSingletonScope();

  bind<RoleService>(TYPE.Domain.Role.Application.Service)
    .to(RoleService)
    .inSingletonScope();

  // Add a bindig for each controller
  bind<UserController>(UserController).to(UserController).inSingletonScope();
  bind<RoleController>(RoleController).to(RoleController).inSingletonScope();
  bind<AuthController>(AuthController).to(AuthController).inSingletonScope();
});

const iocContainer = new Container();
iocContainer.loadAsync(bindings);

export { iocContainer }
