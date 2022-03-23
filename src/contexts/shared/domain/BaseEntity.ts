export interface BaseEntity {
  /**
   *  @returns {any} Return a new object based on the entity
   */
  toPrimitives(): any;

  /**
   *  @returns {string} Return a string representation of the entity
   */
  toString(): string;
}
