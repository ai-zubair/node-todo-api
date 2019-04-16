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
            console.log(`Ah! Snap! An Error occurred creating the collection ${collection.s.name}!`);
            return;
        }
        collection.insertOne({
            task: 'getting started with mongo db',
            status : 'Incomplete'
        },(err,result)=>{
            if(err){
                console.log(`Ah! Snap! An Error occurred writing documment(s) into the collection ${collection.s.name}`);
                return;
            }
            console.log(`${result.insertedCount} record(s) successfully inserted into ${collection.s.name} collection:\n${JSON.stringify(result.ops,undefined,2)} `)
        })
    })
    db.collection('Users',(err,collection)=>{
        if(err){
            console.log(`Ah! Snap! An Error occurred creating the collection ${collection.s.name}!`);
            return;            
        }
        collection.insertOne({
            name: 'zubair',
            email: 'zubair@gmail.com',
            password : 'thisIsJustMe'
        },(err,result)=>{
            if(err){
                console.log(`Ah! Snap! An Error occurred writing documment(s) into the collection ${collection.s.name}`);
                return;
            }
            console.log(`${result.insertedCount} record(s) successfully inserted into ${collection.s.name} collection:\n${JSON.stringify(result.ops,undefined,2)} `)
        })
    })
    client.close();
});