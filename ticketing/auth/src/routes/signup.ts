import express, {Request, Response} from 'express';
import {body, validationResult} from 'express-validator';

import {RequestValidationError} from '../middleware/request-validation-error';
import { DatabaseConnectionError } from './../middleware/database-connection.error';

const router = express.Router();

router.post('/api/users/signin',[
    body('email').
    isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .isLength({min:4, max: 20})
   .withMessage('password must be min 4 max 20 characters')
],(req: Request,res: Response) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    }

    throw new DatabaseConnectionError();
    
    const {email,password} = req.body;

    res.send({});
});



export {router as signupRouter}