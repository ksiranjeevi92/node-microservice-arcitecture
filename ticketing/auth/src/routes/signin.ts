import express, {Request, Response} from 'express';
import {body, validationResult} from 'express-validator';

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
        return res.status(400).send(errors.array());
    }
    
    const {email,password} = req.body;

    res.send({});
});


export {router as signinRouter}