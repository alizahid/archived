import { FastifyError } from 'fastify'

export class Exception implements FastifyError {
  name = 'exception'
  message: string
  statusCode: number

  constructor(message: string, statusCode: number) {
    this.message = message
    this.statusCode = statusCode
  }
}
