const { MongoClient , ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser : true },(error,client)=>{
    if(error){
        console.log('Ah! Snap! An error ocurred connecting to the database servers!');
    }
    const db = client.db();
    db.collection('Todos',(err,collection)=>{
        if(err){
            console.log(`Ah! Snap! An Error occurred fetching the collection ${collection.collectionName}!`);
            return;
        }
        collection.find({
            _id : new ObjectID('5cb6057170472d0f99e40a28')
        }).toArray().then((documents)=>{
            console.log(documents)
        },(err)=>{
            console.log(`Ah! Snap! An error occurred fetching the documents from ${collection.collectionName}`)
        })
    });
    client.close();
})