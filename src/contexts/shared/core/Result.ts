import { Nullable } from '../domain/types/Nullable'

export class Result<T> {
  isSuccess: boolean;
  error: T | string;
  private _value: Nullable<T>;

  constructor(isSuccess: boolean, error: string | T, value: T) {
    this.isSuccess = isSuccess;
    this.error = error;
    this._value = value;
    Object.freeze(this);
  }

  getValue(): T | Nullable<T> {
    if (!this.isSuccess) {
      return this.error as T;
    }
    return this._value;
  }
}
