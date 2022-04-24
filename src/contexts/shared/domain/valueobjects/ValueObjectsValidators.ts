import { EMAIL_REGEX } from '../../../../app/utils/constants'
import { Either, left, right } from '../../core/Either'

/**
 *
 * @param input
 */
export function validateMaxStringLength(
  input: string,
  length: number
): Either<string, string> {
  if (input.length <= length) return right(input)
  return left('MAX_LENGTH_ERROR')
}

/**
 *
 * @param input
 */
export function validateMinStringLength(
  input: string,
  length: number
): Either<string, string> {
  if (input.length >= length) return right(input)
  return left('MIN_LENGTH_ERROR')
}

/**
 *
 * @param input
 */
export function validateStringNotEmpty(input: string): Either<string, string> {
  if (input === '') return left('VALUE_EMPTY_ERROR')
  return right(input)
}

/**
 *
 * @param input
 * @param pattern
 * @returns
 */
export function validateStringMatchPattern(
  input: string,
  pattern: RegExp
): Either<string, string> {
  if (input.match(pattern)) return right(input)
  return left('TEXT_FORMAT_ERROR')
}

/**
 *
 * @param input
 * @returns
 */
export function validateEmailPattern(input: string) {
  if (input.match(EMAIL_REGEX)) return right(input)
  return left('EMAIL_FORMAT_ERROR')
}
