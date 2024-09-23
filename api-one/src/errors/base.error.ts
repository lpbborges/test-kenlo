export class BaseError extends Error {
    code: number

    constructor({ code, message }: { code: number; message: string }) {
        super()
        this.code = code
        this.message = message
    }
}
