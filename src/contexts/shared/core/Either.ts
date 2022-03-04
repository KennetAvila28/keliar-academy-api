/**
 * @author Kennet Avila
 */

/**
 * `Left` is used for failure.
 */
export interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}

/**
 * `Right` is used for success.
 */
export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}

/**
 * An instance of `Either` is either an instance of `Left` or `Right`.
 * Represents a value of one of two possible types (a disjoint union).
 */
export type Either<E, A> = Left<E> | Right<A>

/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise.
 * @param ma
 * @returns
 */
export const isLeft = <E, A>(ma: Either<E, A>) => {
  return ma._tag === 'Left'
}

/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise.
 * @param ma
 * @returns
 */
export const isRight = <E, A>(ma: Either<E, A>) => {
  return ma._tag === 'Right'
}

/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure
 * @param e
 * @returns
 */
export const left = <E = never, A = never>(e: E): Either<E, A> => {
  return { _tag: 'Left', left: e }
}

/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value
 * @param a
 * @returns
 */
export const right = <E = never, A = never>(a: A): Either<E, A> => {
  return { _tag: 'Right', right: a }
}

/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 * @param either
 * @param onLeft
 * @param onRight
 * @returns
 */
export function fold<E, A, B>(
  either: Either<E, A>,
  onLeft: (e: E) => B,
  onRight: (a: A) => B
): B {
  return isLeft(either)
    ? onLeft((either as Left<E>).left)
    : onRight((either as Right<A>).right)
}

/**
 * Returns the wrapped value if it's a `Right` or a default value if is a `Left`.
 * @param either
 * @param onLeft
 * @returns
 */
export function getOrElse<E, A>(either: Either<E, A>, onLeft: (e: E) => A): A {
  return isLeft(either)
    ? onLeft((either as Left<E>).left)
    : (either as Right<A>).right
}
