const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todos } = require('./db-models/todos');
const { Users } = require('./db-models/users');

var app =  express();

app.use(bodyParser.json());

app.post('/todos',(req,res,next)=>{
    console.log(req.body);
    res.send('success!')
})

app.listen(3000,()=>{
    console.log('Server has been fired at localhost:3000')
})