const mongoose = require('mongoose');
const isEmail =  require('validator/lib/isEmail');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//creating a schema for the documents of the users collection
const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        minlength : 1,
        trim : true,
        unique : true,
        validate : {
            validator : isEmail,
            message: props => `${props.value} is not a valid email.`
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minlength : 6
    },
    tokens : [
        {
            access : {
                type : String,
                required : true
            },
            token : {
                type : String,
                required : true
            }
        }
    ]
})

UserSchema.methods.generateAuthToken = function (){
    const user = this ; //reference for the current user
    const access = 'auth';
    const token = jwt.sign({ _id : user._id.toHexString() , access },'abc123abc'); //create the token property from the payload

    //save the token for the user
    user.tokens.push({
        access,
        token
    });

    return user.save().then(() => token); //to prevent handling of save() redundantly
}

UserSchema.methods.toJSON = function () {
    const user = this ;
    return _.pick(user,['_id','email'])
}
UserSchema.statics.findByToken = function(token) {
    const Users = this;
    var decodedToken;
    try{
        decodedToken = jwt.verify(token,'abc123abc')
    }catch(err){
        return Promise.reject('Auth token verification failed!');
    }
    return Users.findOne({
        '_id' : decodedToken._id,
        'tokens.token' : token,
        'tokens.access' : 'auth'
    })
}
//creating a users model
const Users = mongoose.model('Users',UserSchema);

module.exports = {
    Users
}