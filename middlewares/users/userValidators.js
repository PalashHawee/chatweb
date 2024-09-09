const {check,validationResult}=require('express-validator')
const createError=require('http-errors')
const User=require('../../models/People')
const {unlink}=require('fs')
const path=require('path')

//add user
const addUserValidators =[
    check('name')
    .isLength({min:1})
    .withMessage('Name is required')
    .isAlpha('en-us',{ignore:'-'})
    .withMessage('Name must contain only alphabetic characters')
    .trim(),
    check('email')
    .isEmail()
    .withMessage('Invalid email address')
    .trim()
    .custom(
        async(value)=>{
            try{
                const user= await User.findOne({ email: value})
                if(user){
                    throw new Error('Email already exists')
                }
            }catch(err){
                throw createError(err.message)
            }
        }
    ),
    check('mobile')
    .isMobilePhone('bn-BD',{
        strictMode: true,
        
    })
    .withMessage('Invalid mobile number')
    .custom(
        async(value)=>{
            try{
                const user= await User.findOne({ mobile: value})
                if(user){
                    throw createError('Mobile number already exists')
                }
            }catch(err){
                throw createError(err.message)
            }
        }
    ),
    check('password')
    .isStrongPassword()
    .withMessage('Password must be strong')
]

//handling validation errors
const addUserValidationHandler =function(req,res,next){
    const error=validationResult(req)
    const mappedError=error.mapped()
    if(Object.keys(mappedError).length==0){
        next()
    }else{
        if(req.files.length>0){
            const {filename}=req.files[0]
            unlink(
                path.join(__dirname,`/../public/uploads/avatars/${filename}`),
                (err)=>{
                    if(err) console.log(err)
                }
            )
        }
    }
}

module.exports = {
    addUserValidators,
    addUserValidationHandler
};