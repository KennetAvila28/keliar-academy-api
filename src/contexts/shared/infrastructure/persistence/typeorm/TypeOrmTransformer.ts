import { ValueObject } from '../../../domain/valueobjects/ValueObject'

interface NewableClass<T> extends Function {
  new (...args: any[]): T
}

export const TypeOrmTransformer = (
  ValueObjectClass: NewableClass<ValueObject<any>>
) => {
  return {
    to: (value: ValueObject<any>): any => value.get(),
    from: (value: any): ValueObject<any> => new ValueObjectClass(value),
  }
}
