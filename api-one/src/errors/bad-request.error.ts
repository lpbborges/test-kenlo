import { BaseError } from './base.error'
export class BadRequestError extends BaseError {
    constructor(message: string) {
        super({ code: 400, message })
    }
}
