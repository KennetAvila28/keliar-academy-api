/**
 * @description Base inmutable object class
 * @author Kennet Avila
 */

export abstract class ValueObject<T> {
  readonly _value: T

  constructor(value: T) {
    this._value = value
  }

  /**
   * Return the value of the valueobject
   * @returns Returns the primitive value
   */
  get(): T {
    return this._value
  }

  /**
   * Compare the ValueObject with other
   * @param otherValue ValueObject to compare
   * @returns Returns true if the objects has the same value
   */
  // sameAs(otherValue: ValueObject<T>): boolean {
  //   return this._value === otherValue.get()
  // }

  private onLeft(value: T): T {
    throw new Error(`Unexpected with value ${value}`)
  }

  private onRight(value: T): T {
    return value
  }
}
