const mongoose = require('mongoose');

//creating a schema for the documents of the todo collection
const todosSchema = new mongoose.Schema({
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
//creating a model for the todo collection to attach the schema to all of its documents
const Todos = mongoose.model('Todos', todosSchema);

module.exports = {
    Todos
}