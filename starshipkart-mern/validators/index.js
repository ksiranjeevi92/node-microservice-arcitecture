exports.userSignUpvalidator = (req,res,next) => {
 req.check('name', 'Name is required').notEmpty();
 req.check('email','Email must be between 3 to 31 charactor')
 .matches(/.+|@.+\..+/)
 .withMessage("Email must contain @")
 .isLength({
     min: 4,
     max: 32
 });
 req.check('password', 'password is required').notEmpty()
 req.check('password').isLength({min: 6})
 .withMessage("password must contan atlease 6")
;

const errors = req.validationErrors()
if(errors){
    console.log('errors', errors);
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({error: firstError});
}
next()
};  