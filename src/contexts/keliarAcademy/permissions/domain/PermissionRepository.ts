import { Either } from "../../../shared/core/Either";
import { Permission } from "./Permission";
import { PermissionFailure } from "./PermissionFailure";

export interface PermissionRepository {
    /**
     * Find all Permissions
     * return a list of Permissions
     */
    findAll(): Promise<Either<PermissionFailure, Permission[]>>


}