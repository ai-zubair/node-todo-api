const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser : true},(err,client)=>{
    if(err){
        console.log('Ah! Snap! An Error occurred connecting to the database servers!');
        return;
    }
    console.log('Successfully connected to the database servers!');
    const db = client.db();
    db.collection('Todos',(err,collection)=>{
        if(err){
            console.log('Ah! Snap! An Error occurred creating the collection!');
            return;
        }
        collection.insertOne({
            task: 'getting started with mongo db',
            status : 'Incomplete'
        },(err,result)=>{
            if(err){
                console.log('Ah! Snap! An Error occurred writing documments into the collection!');
                return;
            }
            console.log(`${result.insertedCount} record(s) successfully inserted:\n${JSON.stringify(result.ops,undefined,2)} `)
        })
    })
    client.close();
});