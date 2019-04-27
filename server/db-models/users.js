const mongoose = require('mongoose');
const isEmail =  require('validator/lib/isEmail');

//creating a schema for the documents of the users collection
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        minlength : 1,
        trim : true,
        unique : true,
        validate:{
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
//creating a users model
const Users = mongoose.model('Users',userSchema);

module.exports = {
    Users
}