import Ajv from 'ajv'

import ValidationError from '../errors/validation-error'

const REASON_REQUIRED = 'required'
const REASON_REQUIRED_MESSAGE = 'is required'

const humanReadableErrors = errors =>
  errors.map(error => {
    const {
      instancePath,
      message,
      keyword: reason,
      params: { missingProperty }
    } = error

    const path = (reason === REASON_REQUIRED ? `${instancePath}.${missingProperty}` : instancePath).replace(
      /^\./,
      ''
    )

    const text =
      reason === REASON_REQUIRED
        ? REASON_REQUIRED_MESSAGE
        : message.replace('should', 'must').replace(/"/g, '`')

    return { path, message: `'${path}' ${text}`, reason }
  })

const factory = (schema, { coerce = true, defaults = true, property = 'body' } = {}) => {
  const ajv = new Ajv({
    coerceTypes: coerce,
    useDefaults: defaults,
    allErrors: true
  })

  const compile = Promise.resolve(() => ajv.compile(schema))

  return (req, res, next) => {
    const validateBody = validate => {
      if (validate(req[property] || {})) {
        return next()
      }

      const errors = humanReadableErrors(validate.errors)
      const message = errors.map(error => error.message).join(', ')

      return next(new ValidationError(message, errors))
    }

    compile
      .then(validateFactory => validateFactory())
      .then(validateBody)
      .catch(next)
  }
}

factory.body = (schema, options) => factory(schema, { ...options, property: 'body' })
factory.query = (schema, options) => factory(schema, { ...options, property: 'query' })

export default { factory }
