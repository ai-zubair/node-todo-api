const { Users } = require('../db-models/users');

const authenticateToken = (req,res,next)=>{
    const token = req.header('x-auth');
    Users.findByToken(token).then( user => {
        if(!user){
            return Promise.reject('Auth token verification failed!');
        }
        req.user = user;
        req.token = token;
        next();
    }).catch(err=>{
        res.status(401).send(err);
    })
}

module.exports = {
    authenticateToken
}