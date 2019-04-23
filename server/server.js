const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose'); //requiring the confgiured mongoose variable
const { Todos } = require('./db-models/todos');
const { Users } = require('./db-models/users');

var app =  express();

app.use(bodyParser.json());

app.post('/todos',(req,res,next)=>{
    const newTodo = new Todos({
        text : req.body.text,
        status : req.body.status
    })
    newTodo.save().then((todo)=>{
        res.send(`Your todo has been successfully saved @ ${todo._id.getTimestamp()}\n${todo}`)
    }).catch((err)=>{
        res.status(400).send(`Ah! Snap! An error ocurred saving the response!\n${err}`)
    })
})

app.get('/todos',(req,res,next)=>{
    Todos.find({
        text: 'sending test todo from the post man'
    }).then( todos=>{
        res.send({
            todos
        })
    }).catch((err)=>{
        res.status(400).send(`Ah! Snap! An error ocurred saving the response!\n${err}`)
    })
})

app.listen(3000,()=>{
    console.log('Server has been fired at localhost:3000')
})