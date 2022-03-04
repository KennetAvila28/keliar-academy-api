/** 
 * @description  classes for bussiness rules to user
 * @author Kennet Avila
 * 
 */
import { ValueObject } from '../../../shared/domain/valueobjects/ValueObject'
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from '../../../../app/utils/constants'
import bcrypt from 'bcryptjs'
/**
 * @description class to validate User Emaill 
 */
class UserEmail extends ValueObject<string> {
  constructor(value: string) {
    super(value)
    this.validateEmail(value)
  }

  validateEmail(value: string) {
    const regex = new RegExp(EMAIL_REGEX)
    if (regex.test(value)) {
      throw Error('Invalid email structure, must be a valid email address')
    }
  }
}

/**
 * @description class to validate User Name
 */
class UserName extends ValueObject<string> {
  constructor(value: string) {
    super(value)
    this.validateName(value)
  }
  validateName(value: string){
    const regex = new RegExp(NAME_REGEX)
    if (!regex.test(value)) {
      throw Error('Invalid name structure, must be a valid name')
    }
  }
}

/**
 * @description class to validate User Password
 */
class UserPassword extends ValueObject<string> {
  constructor(value: string) {
    super(setPassword(value))
    this.validateLenght(value)
    this.validateStructure(value)
    
  }

  validateLenght(value: string): void {
    if (value.length < 8) {
      throw Error('Invalid password length most be greater than 8')
    }
    if (value.length > 12) {
      throw Error('Invalid password length most be less or equal than 12')
    }
  }

  validateStructure(value: string): void {
    const regular = new RegExp(PASSWORD_REGEX)
    if (regular.test(value)) {
      throw Error('Invalid password structure, must be a valid password')
    }
  }
}

function setPassword(password:string):string {
  const salt =  bcrypt.genSaltSync(10)
   return bcrypt.hashSync(password, salt)
}
//TODO: Add more attributtes to this entity

export { UserEmail, UserName, UserPassword }
