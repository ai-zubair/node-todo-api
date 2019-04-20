const mongoose = require('mongoose');

//configure mongoose to use the Js built in promises and not the ones from any third party
mongoose.Promise = global.Promise;

//connecting to a mongo db server and tapping into the specified db
mongoose.connect("mongodb://localhost:27017/TodoApp",{useNewUrlParser : true})

//creating a schema for the documents of the todo collection
var todosSchema = new mongoose.Schema({
    text:{
        type: String,
        minlength : 1,
        trim : true,
        required: true
    },
    status : {
        type: Boolean,
        default : false
    }
})

//creating a schema for the documents of the users collection
var userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        minlength : 1,
        trim : true
    }
})

//creating a model for the todo collection to attach the schema to all of its documents
var Todos = mongoose.model('Todos', todosSchema);

//cerating a users model
var Users = mongoose.model('Users',userSchema);

//creating a new document in the todos collection using the model of the same
var newTodo = new Todos({
    text:'t'
})

//creating a new user document
var newUser = new Users({
    email : 'zubair@mail.com'
})

//saving the document into the todos collection
newTodo.save().then((todo)=>{
    console.log('Saved the todo:\n',todo)
}).catch(err=>console.log(err));

//saving the document into the users collection
newUser.save().then((user)=>{
    console.log('Saved the user:\n',user)
})