const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todos } = require('./db-models/todos');
const { Users } = require('./db-models/users');

var app =  express();

app.use(bodyParser.json());

app.post('/todos',(req,res,next)=>{
    console.log(req.body);
    const newTodo = new Todos({
        text : req.body.text,
        status : req.body.status
    })
    newTodo.save().then((todo)=>{
        res.send(`Your todo has been successfully saved\n${todo}`)
    }).catch((err)=>{
        res.status(400).send('Ah! Snap! An error ocurred saving the response!')
    })
})

app.listen(3000,()=>{
    console.log('Server has been fired at localhost:3000')
})