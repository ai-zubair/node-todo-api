const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose'); //requiring the confgiured mongoose variable
const { Todos } = require('./db-models/todos');
const { Users } = require('./db-models/users');

const PORT = process.env.PORT || 3000

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
    Todos.find().then( todos=>{
        res.send({
            todos
        })
    }).catch((err)=>{
        res.status(400).send(`Ah! Snap! An error ocurred saving the response!\n${err}`)
    })
})

app.get('/todos/:id',(req,res,next)=>{
    const taskID = req.params.id;
    if(!ObjectID.isValid(taskID)){
        res.status(404).send();
    }
    Todos.findById(taskID).then((task)=>{
        if(!task){
            res.status(404).send()
        }
        res.status(200).send(task);
    }).catch((err)=>{
        res.status(400).send();
    })
})

app.listen(PORT,()=>{
    console.log(`Server has been fired at localhost:${PORT}`)
})