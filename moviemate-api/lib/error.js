class Exception {
  constructor(code, message) {
    const error = new Error()

    error.code = code
    error.message = message

    return error
  }

  static boom(code, message) {
    return new Exception(code, message)
  }

  static notFound() {
    return new Exception(404, 'Not found')
  }

  static personNotFound() {
    return new Exception(404, 'Person not found')
  }
}

module.exports = Exception
