const mongoose = require('mongoose');

//configure mongoose to use the Js built in promises and not the ones from any third party
mongoose.Promise = global.Promise;

//connecting to a mongo db server and tapping into the specified db
mongoose.connect("mongodb://localhost:27017/TodoApp",{useNewUrlParser : true})

//exporting the configured mongoose variable
module.exports = {
    mongoose
}


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