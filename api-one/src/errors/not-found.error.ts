import { BaseError } from './base.error'

export class NotFoundError extends BaseError {
    constructor(message: string) {
        super({ code: 404, message })
    }
}
