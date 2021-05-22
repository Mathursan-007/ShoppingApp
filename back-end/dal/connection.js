const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:admin@first.yueye.mongodb.net/shoppingdb?retryWrites=true&w=majority";//assigning the connection uri

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });//creating a client object

client.connect(err => {     //initializing the connection to the db
    if(err){
        console.log(err)
    }
    console.log("DB successfully connected");

});



module.exports=client;   //exporting the client instance
