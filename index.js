const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const User = require('./model/user');
const userRoutes= require('./routes/userRoutes');
const adminRoutes= require('./routes/adminRoute');
const basicAuthPlugin = require('./plugins/authbasic');
const AuthBearerPlugin = require('./plugins/authBearer');


mongoose.connect('mongodb://127.0.0.1:27017/User_Page')

 .then(() => { 
  console.log("db started!");
 })
 .catch((e) => {
  console.log(e);
 });


 const init = async () => {


    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
   
    
    await server.register(basicAuthPlugin);
    await server.register(AuthBearerPlugin);
    
  
    server.validator(require('joi'));
   server.route(userRoutes);
   server.route(adminRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
