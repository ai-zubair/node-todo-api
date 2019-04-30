const mongoose = require('mongoose');

//creating a schema for the documents of the todo collection
const TodosSchema = new mongoose.Schema({
    text:{
        type: String,
        minlength : 1,
        trim : true,
        required: true
    },
    status : {
        type: Boolean,
        default : false
    },
    completedAt:{
        type : String,
        default : 'Not completed yet'
    }
})
//creating a model for the todo collection to attach the schema to all of its documents
const Todos = mongoose.model('Todos', TodosSchema);

module.exports = {
    Todos
}