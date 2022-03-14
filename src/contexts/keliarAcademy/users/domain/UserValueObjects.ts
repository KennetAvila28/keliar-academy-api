/** 
 * @description  classes for bussiness rules to user
 * @author Kennet Avila
 * 
 */
import { ValueObject } from '../../../shared/domain/valueobjects/ValueObject'
import { NAME_REGEX } from '../../../../app/utils/constants'
import bcrypt from 'bcryptjs'
import { Either, right } from '../../../shared/core/Either'
import { validateEmailPattern, validateMaxStringLength, validateMinStringLength, validateStringMatchPattern } from '../../../shared/domain/valueobjects/ValueObjectsValidators'
/**
 * @description class to validate User Emaill 
 */
class UserEmail extends ValueObject<string> {
  _value: Either<string, string>
  constructor(value: string) {
    super()
    this._value = validateEmailPattern(value)
  }
}

/**
 * @description class to validate User Name
 */
class UserName extends ValueObject<string> {
  _value: Either<string, string>

  constructor(value: string) {
    super()
    this._value = validateStringMatchPattern(value, NAME_REGEX)
    this._value = validateMinStringLength(value, 3)
    this._value = validateMaxStringLength(value, 150)
  }

}

/**
 * @description class to validate User Password
 */
class UserPassword extends ValueObject<string> {
  _value: Either<string, string>
  constructor(value: string) {
    super()
    this._value = validateMinStringLength(value, 8)
    this._value = validateMaxStringLength(value, 12)
    this._value = this.encrypt(value)
  }

  encrypt(value: string): Either<string, string> {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(value, salt)
    return right(hash)
  }

  compare(value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash)
  }
}

//TODO: Add more attributtes to this entity

export { UserEmail, UserName, UserPassword }
