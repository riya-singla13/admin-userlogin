const User = require('../model/user');
const { Boom } = require('@hapi/boom');
const bcrypt = require ('bcryptjs') ;




const taskcontroller = {
    createUser : async (request,h) =>{
        try{ 
           
            var user = new User(request.payload);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword ; 
            var result = await user.save();
            console.log("registration successful!!")
                return {message : "User created successfully", result};
            }catch(error) {
            return "error";
        } 
    },
    getUser : async(request,h) => {
        try{  const {email, password } = request.payload;
        
              const user = await User.findOne({email});
              isBlock = user.isBlock ; 
              //return h.response(user) ;
                console.log("finduser")
                   if (user){
                        console.log("user") 
                        const validpassword = await bcrypt.compare(password, user.password);;
                        if (validpassword) {
                            console.log("success")
                            if (isBlock)
                            {return h.response("User is blocked by admin")
                        }
                            return  h.response("Login Successfull");
                            
                        }
                    
                 
                }else   
                        return h.response("invalid username or password");
        }catch(error) {
        return ("error");
    }
    
    },    
    changePassword : async (request,h) =>{
        try{  
            const {oldPassword,newPassword} = request.payload ;
            const {credentials } = request.auth ;
            const user = await User.findById (credentials.id);
              if(!user) {
                throw  Boom.unauthorised('Invalid Credentials');
              }           
              const isValid = (oldPassword === user.password) ;
                  if (!isValid){
                    
                   return h.response('Invalid old password');
                }
                user.password = (newPassword);
                await user.save();
                return {message : 'Password changed successfully'};
            
            
            }catch(error) {
            return h.response.error.code(500);
        } 
    },

    editProfile : async(request,h) => {
            try{ 
                var user = await User.findByIdAndUpdate( {_id :request.payload._id },request.payload, {new :true});
                console.log("updated")
                return h.response({message : "Profile Updated successfully" , user});
                
    
            } catch(error) {
                return ("error");
            } 
          }
    
};
    

    module.exports = taskcontroller
