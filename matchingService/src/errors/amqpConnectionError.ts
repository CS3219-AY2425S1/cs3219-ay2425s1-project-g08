class AmqpConnectionError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, AmqpConnectionError.prototype); // Fix prototype chain for ES5
    }
}

export default AmqpConnectionError