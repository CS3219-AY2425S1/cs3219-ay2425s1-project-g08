class AmqpCreateChannelError extends Error {
  statusCode: number

  constructor (message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    Object.setPrototypeOf(this, AmqpCreateChannelError.prototype) // Fix prototype chain for ES5
  }
}

export default AmqpCreateChannelError
