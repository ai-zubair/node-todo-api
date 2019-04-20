const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/TodoApp",{useNewUrlParser : true})

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

var todos = mongoose.model('Todos', todosSchema);

var newTodo = new todos({
    text:'this is a mongoose test',
    status: false
})

newTodo.save().then((todo)=>{
    console.log('Saved the todo:\n',todo)
}).catch(err=>console.log(err));