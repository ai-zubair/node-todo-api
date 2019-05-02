const mongoose = require('mongoose');
const _ = require('lodash');
//creating a schema for the documents of the todo collection
const TodosSchema = new mongoose.Schema({
    _creator : {
        type : mongoose.Schema.Types.ObjectId,
        required : true 
    },
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
//over-ride the toJSON instance method for the todo instances
TodosSchema.methods.toJSON = function(){
    const todo = this;
    return _.pick(todo,['text','status']);
}
//creating a model for the todo collection to attach the schema to all of its documents
const Todos = mongoose.model('Todos', TodosSchema);

module.exports = {
    Todos
}