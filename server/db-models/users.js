const mongoose = require('mongoose');
const isEmail =  require('validator/lib/isEmail');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

//user instance method to geerate a jwt whenever a user either signs up or logs in
UserSchema.methods.generateAuthToken = function (){
    const user = this ; //reference for the current user
    const access = 'auth';
    const token = jwt.sign({ _id : user._id.toHexString() , access },'abc123abc'); //create the token property from the payload

    //save the token for the user
    user.tokens.push({
        access,
        token
    });

    return user.save().then(() => Promise.resolve(token)); //to prevent handling of save() redundantly
}

//overriding the default toJSON method for user instances to show only the desired properties to the user
UserSchema.methods.toJSON = function () {
    const user = this ;
    return _.pick(user,['_id','email'])
}

//user model method to find a user specific to the token provided as a request header
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

//tap on to the save event to hash the passwords before being saed to the db
UserSchema.pre('save',function(next){
    const user = this ;
    if(user.isModified('password')){
        bcrypt.hash(user.password,10,(err,hash)=>{
            user.password = hash;
            next();
        })
    }else{
        next();
    }
})

//model method to find a user by credentials
UserSchema.statics.findByCredentials = function(email,password){
    const Users = this;
    return Users.findOne({
        email
    }).then( user =>{
        if(!user){
            return Promise.reject('User Authentication Failed');
        }
        return bcrypt.compare(password,user.password).then(res=>{
            if(res){
                return Promise.resolve(user);
            }else{
                return Promise.reject('User Authentication Failed');
            }
        })
    })
}

//user instance method for removing a login token for the user when the user chooses to logout
UserSchema.methods.deleteUserAuthToken = function(token){
    const user = this;
    return user.update({
        $pull : {
            tokens : {
                token 
            }
        }
    })
}
//creating a users model
const Users = mongoose.model('Users',UserSchema);

module.exports = {
    Users
}