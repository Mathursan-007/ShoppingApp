const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:admin@first.yueye.mongodb.net/shoppingdb?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    if(err){
        console.log(err)
    }
    console.log("DB successfully connected");

});

module.exports=client;
