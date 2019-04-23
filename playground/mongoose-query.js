const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todos } = require('../server/db-models/todos');
const { Users } = require('../server/db-models/users');

const id = 'cbb85b6eeca8020e8977cfb';

if(!ObjectID.isValid(id)){
    console.log("Invalid oid")
}

Todos.find({
    _id:id
}).then((result)=>{
    console.log(`the fetched result is \n${result}`)
}).catch((err)=>{
    console.log('Not found',err);
})

Todos.findOne({
    _id:id
}).then((result)=>{
    console.log(`the fetched result is \n${result}`)
}).catch((err)=>{
    console.log('Not found',err);
})

Todos.findById(id).then((result)=>{
    console.log(`the fetched result is \n${result}`)
}).catch((err)=>{
    console.log('Not found',err);
})

Users.findById(id).then((result)=>{
    if(!result){
        console.log("User not found");
        return;
    }
    console.log(result);
}).catch((err)=>{
    console.log('An error occurred during the search!')
})
