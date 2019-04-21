const mongoose = require('mongoose');

//creating a schema for the documents of the users collection
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        minlength : 1,
        trim : true
    }
})
//creating a users model
const Users = mongoose.model('Users',userSchema);

module.exports = {
    Users
}