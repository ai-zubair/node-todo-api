const { MongoClient , ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser : true },(error,client)=>{
    if(error){
        console.log('Ah! Snap! An error ocurred connecting to the database servers!');
    }
    console.log('Successfully connected to the database servers!'); 
    const db = client.db();
    db.collection('Todos',(err,collection)=>{
        if(err){
            console.log(`Ah! Snap! An Error occurred fetching the collection ${collection.collectionName}!`);
            return;
        }
        collection.findOneAndDelete({
            task : 'getting started with mongo db'
        },(err,result)=>{
            if(err){
                console.log('Ah! Snap! An Error occurred deleting the document(s)!')
            }
            console.log(`Successfully deleted ${JSON.stringify(result.value,undefined,2)} documents!`)
        })
    })
    client.close();
})