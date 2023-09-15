var Joi = require('joi');
   var Boom = require('@hapi/boom');
const User = require("../model/user");


const taskcontroller = {

    finduser : async(request,h) => {
        try{
             var user = await User.find().exec();
             return h.response(user);

    
        } catch(error) { 
            return "error";
        } 
      },
      blockuser : async(request,h) =>{
        try{
            const { _id, isBlock} = request.payload;
            const response =  await User.findOneAndUpdate({_id: _id},{isBlock: isBlock},{new :true});
            console.log(response);
            return { message: 'User blocked successfully' };
        }
       catch(error) {
        console.log(error);
        return "error"; 
      }
    },
      getadmin : async(request,h) => {
      try{  const { username, password } = request.payload;

        if (username === 'janvi' && password === '12345') {

            return ("Login successfull");
        } else {
            return h.response({ message: 'Invalid credentials' }).code(401);
        }
    }catch(error) {
        return "error";
    }
    }
}

        module.exports = taskcontroller
    