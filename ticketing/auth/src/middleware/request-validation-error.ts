import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error{
    statusCode = 400;
    constructor(
        private errors: ValidationError[]
    ){
        super();
        Object.setPrototypeOf(this,RequestValidationError);
    }

    serialiseError(){
        const formattedError = this.errors.map((error) => {
            return {message: error.msg, field: error.param}
        })
        return formattedError;
    }
}