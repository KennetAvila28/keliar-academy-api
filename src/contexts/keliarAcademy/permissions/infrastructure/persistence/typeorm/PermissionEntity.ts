import { EntitySchema } from 'typeorm'
import { Permission } from '../../../domain/Permission'
export const PermissionEntity = new EntitySchema<Permission>({
    name: 'Permission',
    tableName: 'permissions',
    target: Permission,
    columns: {
        _id: {
            type: String,
            primary: true,
        },
        name: {
            type: String,
            length: 150,
            nullable: false,
        },
        description: {
            type: String,
            length: 300,
            nullable: true,
        },
        module: {
            type: String,
            length: 150,
            nullable: false,
        },
    },

})
