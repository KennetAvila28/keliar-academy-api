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
  },
  Services: {},
}
