const AuthBearer = require('hapi-auth-bearer-token');


const validate= async (request, token, h) => {
    if (token === '12345') {
        return { isValid: true, credentials: { token } };
    } else {
        return { isValid: false, credentials: null };
    }
}




const Auth = [
{name: 'auth-bearer-token',
    register: async (server, options) => {
        await server.register(AuthBearer);
        server.auth.strategy('adminToken', 'bearer-access-token',{ validate });
        //server.auth('adminToken');
    } 
}
]



module.exports = Auth