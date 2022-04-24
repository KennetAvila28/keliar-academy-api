/**
 * @description Base inmutable object class
 * @author Luis Palma
 */

import { Either, getOrElse, isRight } from '../../core/Either'

export abstract class ValueObject<T> {
  abstract readonly _value: Either<T, T>

  isValid(): boolean {
    return isRight(this._value)
  }

  /**
   * Return the value of the valueobject
   * @returns Returns the primitive value
   */
  get(): T {
    return getOrElse(this._value, this.onLeft)
  }

  /**
   * Compare the ValueObject with other
   * @param otherValue ValueObject to compare
   * @returns Returns true if the objects has the same value
   */
  // sameAs(otherValue: ValueObject<T>): boolean {
  //   return this._value === otherValue.get()
  // }

  /**
   *
   * @param value
   */
  private onLeft(value: T): T {
    throw new Error(`${value}`)
  }
}
