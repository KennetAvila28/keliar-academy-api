import { Either, left, right } from '../../core/Either'
import { ValueObject } from './ValueObject'
import { validate } from 'uuid'

export class UniqueId extends ValueObject<string> {
  _value: Either<string, string>;

  constructor(value: string) {
    super();
    this._value = this.validateUUID(value);
  }

  validateUUID(value: string): Either<string, string> {
    if (!validate(value)) {
      return left('INVALID_ID');
    }
    return right(value);
  }
}
