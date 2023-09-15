const userController = require('../controller/userController');
const Joi = require('joi');


const Routes = [
{
    method: 'POST',
    path: '/change',
    options: {
        validate: {
            payload: Joi.object({
                oldPassword: Joi.string().required(),
                newPassword: Joi.string().required()
            })
        },
        auth :'simple'
    },
    handler: userController.changePassword
    },
    {
        method: 'POST',
        path: '/login',
        options: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                })
            },
            auth :'adminToken'
        },
        handler: userController.getUser
        },

{
    method :"POST",
    path :"/register",
    config : { 
         
        validate: {
            payload: Joi.object({
                name: Joi.string().min(3).max(30).required(),
                email: Joi.string().email().required() ,
                password : Joi.string().required(),
                PhoneNo : Joi.number(),
            }),
       
        
        }
      
    },
    handler:  userController.createUser 
},
{
    method :"PUT",
    path :"/edit",
    options: {
        validate: {
                payload: Joi.object({
                
                 _id: Joi.string().required(),
                name: Joi.string().max(255),
                email: Joi.string().email(),
                password : Joi.string().min(4),
                PhoneNo: Joi.number().max(10)
            })
        }
    },
    handler: userController.editProfile
}, 
]
module.exports = Routes