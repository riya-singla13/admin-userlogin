const adminController = require('../controller/adminController');
const Joi = require('joi');



const Routes = [
    {
    method: 'POST',
    path: '/admin/login',
    options: {
        validate: {
            payload: Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required()
            })
        },
        auth :'adminToken'
    },
    handler: adminController.getadmin
},
{
    method: 'GET',
    path: '/',
    config : { 
        /*validate: validatePayload = {
            query: {
                name: Joi.string().min(3).max(30).required(),
                email: Joi.string().email().required() ,
                password : Joi.string().required(),
                PhoneNo : Joi.number().max(10),
            }
        }, */
    handler: adminController.finduser
    }
},
{
    method: 'POST',
    path: '/admin/blockuser',
    handler: adminController.blockuser

}
]

module.exports = Routes