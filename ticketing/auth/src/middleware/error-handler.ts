import {Request,Response,NextFunction} from 'express';
import { DatabaseConnectionError } from './database-connection.error';
import { RequestValidationError } from './request-validation-error';

export const errorHandler = 
(
    err: Error,
    req: Request,
    res:Response,
    next: NextFunction
    ) => {
        if(err instanceof RequestValidationError){
            return res.status(err.statusCode).send({errors: err.serialiseError()});
        }
        if(err instanceof DatabaseConnectionError){
            return res.status(err.statusCode).send({errors: err.serialiseError()});
        }
        res.status(400).send({message:"Something went wrong!"})
    }