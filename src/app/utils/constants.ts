export const NAME_REGEX = /[A-Za-zÁÉÍÓÚñáéíóúÑ\s]/
export const PHONE_REGEX = /[0-9]{10,15}/
export const ADDRESS_REGEX = /[A-Za-z0-9]+/
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/
export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
