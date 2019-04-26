const express = require('express');
const bodyParser = require('body-parser'); //parse request bodies on to the request object as req.body
const { ObjectID } = require('mongodb'); //validate the object id passed in the URL

const { mongoose } = require('./db/mongoose'); //requiring the confgiured mongoose variable
const { Todos } = require('./db-models/todos'); //Todos model for the db
const { Users } = require('./db-models/users'); //Users model for the db

//configuring the prot for heroku
const PORT = process.env.PORT || 3000

//create the express appp
var app =  express();

//using the body parser middleware function to parse request bodies as json
app.use(bodyParser.json());

//set up POST route for adding todos to the TODO's collectio for the database
app.post('/todos',(req,res,next)=>{
    const newTodo = new Todos({
        text : req.body.text,
        status : req.body.status
    })
    newTodo.save().then((todo)=>{
        res.send(`Your todo has been saved successfully @ ${todo._id.getTimestamp()}\n${todo}`)
    }).catch((err)=>{
        res.status(400).send(`Ah! Snap! An error ocurred saving the response!\n${err}`)
    })
})

//set up GET route for fetching todos from the todos collection
app.get('/todos',(req,res,next)=>{
    Todos.find().then( todos=>{
        res.send({
            todos
        })
    }).catch((err)=>{
        res.status(400).send(`Ah! Snap! An error ocurred saving the response!\n${err}`)
    })
})

//set up GET route for fetching todo for a given  id
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

//set up the server to listen for connections on the specified port
app.listen(PORT,()=>{
    console.log(`Server has been fired at localhost:${PORT}`)
})