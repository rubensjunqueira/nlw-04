import { Exception } from "handlebars";

export class AppError {
    constructor(public readonly message: string, public readonly statusCode = 400) { }
}