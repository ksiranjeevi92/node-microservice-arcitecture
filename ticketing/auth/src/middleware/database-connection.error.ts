export class DatabaseConnectionError extends Error{
    reason = 'Connection error';
    statusCode = 500;
    constructor(
    ){
        super();
        Object.setPrototypeOf(this, DatabaseConnectionError);
    }

    serialiseError(){
        return {errors: [{message: this.reason}]}
    }
}