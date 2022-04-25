/**
 * @description Type constant for mapping simbols of the dependency injection with inversify
 * @author Kennet Avila
 */

export const TYPE = {
  Domain: {
    Base: {
      Repository: Symbol('BaseRepository'),
      Database: Symbol('Database'),
    },
    Auth: {
      Application: {
        Service: Symbol('AuthService'),
        Controller: Symbol('AuthController'),
      },
    },
    User: {
      Application: {
        Service: Symbol('UserService'),
        Controller: Symbol('UserController'),
      },
      Repository: Symbol('UserRepository'),
    },
    Role: {
      Application: {
        Service: Symbol('RoleService'),
        Controller: Symbol('RoleController'),
      },
      Repository: Symbol('RoleRepository'),
    },
    Permission: {
      Application: {
        Service: Symbol('PermissionService'),
        Controller: Symbol('PermissionsController'),
      },
      Repository: Symbol('PermissionRepository'),
    },
    Class: {
      Application: {
        Service: Symbol('ClassService'),
        Controller: Symbol('ClassController'),
      },
      Repository: Symbol('ClassRepository'),
    },
    Student: {
      Application: {
        Service: Symbol('StudentService'),
        Controller: Symbol('StudentsController'),
      },
      Repository: Symbol('StudentRepository'),
    },
  },
  Services: {},
}
