const env = process.env.NODE_ENV || 'development';

if(env === 'development'){
    process.env.PORT = 3000;
    process.env.MONGOLAB_URI = "mongodb://localhost:27017/TodoApp"
}

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser'); //parse request bodies on to the request object as req.body
const { ObjectID } = require('mongodb'); //validate the object id passed in the URL

const { mongoose } = require('./db/mongoose'); //requiring the confgiured mongoose variable
const { Todos } = require('./db-models/todos'); //Todos model for the db
const { Users } = require('./db-models/users'); //Users model for the db
const { authenticateToken } = require('./middleware/authenticate'); //Auth middleware for verifying o user token

//configuring the prot for heroku
const PORT = process.env.PORT;

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

//set up GET route for fetching todo for a given id
app.get('/todos/:id',(req,res,next)=>{
    const taskID = req.params.id;
    if(!ObjectID.isValid(taskID)){
        res.status(404).send("Oops! Looks like you entered an invalid ID");
    }
    Todos.findById(taskID).then((task)=>{
        if(!task){
            res.status(404).send("Oops! No such records were found!")
        }
        res.status(200).send({task});
    }).catch((err)=>{
        res.status(400).send();
    })
})

//set up delete route for deleting a given todo using id
app.delete('/todos/:id',(req,res,next)=>{
    const taskID = req.params.id;
    if(!ObjectID.isValid(taskID)){
        res.status(204).send("Oops! Looks like you entered an invalid ID");
    }
    Todos.findByIdAndDelete(taskID).then((task)=>{
        if(!task){
            res.status(204).send("Oops! No such task were found!")
        }
        res.status(200).send({task});
    }).catch((err)=>{
        res.status(400).send();
    })
})

//set up path route for updating a resource by id
app.patch('/todos/:id',(req,res,next)=>{
    const taskID = req.params.id;
    const reqBody = _.pick(req.body,['status','text']);
    if(!ObjectID.isValid(taskID)){
        res.status(204).send("Oops! Looks like you entered an invalid ID");
    } 
    if(_.isBoolean(reqBody.status)&&reqBody.status===true){
        reqBody.completedAt = Date();
    }else{
        reqBody.status = false ; 
    }
    Todos.findByIdAndUpdate(taskID,{ $set : reqBody }, { new : true } ).then( updatedTask =>{
        if(!updatedTask){
            res.status(204).send("No such task was found")
        }
        res.status(200).send({updatedTask});
    }).catch(err=>{
        res.status(400).send();
    })
})

//set up a post route for adding new users to the db
app.post('/users',(req,res)=>{
    const reqBody = _.pick(req.body,['email','password']);
    const newUser = new Users(reqBody);
    newUser.save().then(()=>{
        return newUser.generateAuthToken();
    }).then((token)=>{
        res.header({ 'x-auth' : token }).send( newUser );
    }).catch( err => {
        if(err.code === 11000 ){
            res.status(400).send(`Oops! Looks like a user with email ${reqBody.email} is already registered!`)
        }
        res.status(400).send(`Ah! Snap! An error occurred registering the user!\n${err}`)
    })
})

//set up aprivate route for the app
app.get('/users/me',authenticateToken,(req,res)=>{
    res.send(req.user);
})

//set up the user login route
app.post('/users/login',(req,res)=>{
    const userCred = _.pick(req.body,['email','password']);
    Users.findByCredentials(userCred.email,userCred.password).then(user=>{
        return user.generateAuthToken();
    }).then(token=>{
        res.header({'x-auth':token}).send('User logged in!');
    }).catch(err=>{
        res.status(401).send(err)
    })
})

//set up the server to listen for connections on the specified port
app.listen(PORT,()=>{
    console.log(`Server has been fired at localhost:${PORT}`)
})