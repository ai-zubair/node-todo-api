const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp",{useNewUrlParser:true},(err,client)=>{
    if(err){
        console.log('Ah! Snap! An error ocurred connecting to the database servers!');
    }
    console.log('Successfully connected to the database servers!');
    const db = client.db();
    db.collection('Users',(err,collection)=>{
        if(err){
            console.log(`Ah! Snap! An Error occurred fetching the collection ${collection.collectionName}!`);
            return;
        }
        collection.findOneAndUpdate({
            _id : new ObjectID( "5cb8e86f4b9c031a3b984804")
        },{
           $set:{
               name : 'Zubair Bashir'
           },
           $inc : {
               age : -6
           },
           $currentDate : {
               bornAgain :true 
           },
           $unset : {
               password : ""
           },
           $rename:{
               email : 'userMail'
           }
        },{
            returnOriginal:false
        }).then((result)=>{
            console.log(result)
        }).catch((err)=>{console.log('An error occurred')})
    })
    client.close();
})