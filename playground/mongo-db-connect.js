const { MongoClient, ObjectID } = require('mongodb');

const oid = new ObjectID();
console.log(oid);

MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser : true},(err,client)=>{
    if(err){
        console.log('Ah! Snap! An Error occurred connecting to the database servers!');
        return;
    }
    console.log('Successfully connected to the database servers!');
    const db = client.db();
    db.collection('Todos',(err,collection)=>{
        if(err){
            console.log(`Ah! Snap! An Error occurred creating the collection ${collection.collectionName}!`);
            return;
        }
        collection.insertOne({
            task: 'getting started with mongo db',
            status : 'Incomplete'
        },(err,result)=>{
            if(err){
                console.log(`Ah! Snap! An Error occurred writing documment(s) into the collection ${collection.collectionName}`);
                return;
            }
            console.log(`${result.insertedCount} record(s) successfully inserted into ${collection.collectionName} collection:\n${JSON.stringify(result.ops,undefined,2)} `)
            console.log(result.ops[0]._id.getTimestamp());

        })
    })
    db.collection('Users',(err,collection)=>{
        if(err){
            console.log(`Ah! Snap! An Error occurred creating the collection ${collection.collectionName}!`);
            return;            
        }
        collection.insertOne({
            name: 'zubair',
            email: 'zubair@gmail.com',
            password : 'thisIsJustMe'
        },(err,result)=>{
            if(err){
                console.log(`Ah! Snap! An Error occurred writing documment(s) into the collection ${collection.collectionName}`);
                return;
            }
            console.log(`${result.insertedCount} record(s) successfully inserted into ${collection.collectionName} collection:\n${JSON.stringify(result.ops,undefined,2)} `)
            console.log(result.ops[0]._id.getTimestamp());
        })
    })
    client.close();
});