import { UserEmail, UserPassword } from '../../users/domain/UserValueObjects'

export class Auth {
  email: UserEmail;
  password: UserPassword;

  constructor(email: UserEmail, password: UserPassword) {
    this.email = email;
    this.password = password;
  }
}
