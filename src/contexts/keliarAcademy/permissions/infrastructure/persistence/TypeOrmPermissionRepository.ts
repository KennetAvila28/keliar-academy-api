import { injectable } from "inversify";
import { EntitySchema } from 'typeorm';
import { TypeOrmRepository } from "../../../../shared/infrastructure/persistence/typeorm/TypeOrmRepository";
import { Permission } from "../../domain/Permission";
import { PermissionEntity } from './typeorm/PermissionEntity';
import { PermissionRepository } from './../../domain/PermissionRepository';
import { Either, right } from './../../../../shared/core/Either';
import { PermissionFailure } from "../../domain/PermissionFailure";
/**
 * TypeOrmPermissionRepository
 */
@injectable()
export class TypeOrmPermissionRepository extends TypeOrmRepository<Permission> implements PermissionRepository {
    async findAll(): Promise<Either<PermissionFailure, Permission[]>> {
        const Repository = await this.repository()
        const permissions = await Repository.find()
        return right(permissions)
    }

    protected entitySchema(): EntitySchema<Permission> {
        return PermissionEntity
    }



}