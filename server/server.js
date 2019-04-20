const mongoose = require('mongoose');

//configure mongoose to use the Js built in promises and not the ones from any third party
mongoose.Promise = global.Promise;

//connecting to a mongo db server and tapping into the specified db
mongoose.connect("mongodb://localhost:27017/TodoApp",{useNewUrlParser : true})

//creating a schema for the documents of the todo collection
var todosSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    status : {
        type: Boolean,
        required : true
    }
})

//creating a model for the todo collection to attach the schema to all of its documents
var todos = mongoose.model('Todos', todosSchema);

//creating a new document in the todos collection using the model of the same
var newTodo = new todos({
    text:'this is a mongoose test',
    status: false
})

//saving the document into the todos collection
newTodo.save().then((todo)=>{
    console.log('Saved the todo:\n',todo)
}).catch(err=>console.log(err));