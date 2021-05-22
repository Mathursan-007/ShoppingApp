let sellers = null;

setTimeout(() => {
    sellers = require('./connection').db('shoppingdb').collection('sellers');
},5000);

//inserts an item record in the db with the given details
const save = async ({firstname,lastname, email, phone,address,password}) => {
    const result = await sellers.insertOne({firstname,lastname, email, phone,address,password});
    return result.ops[0];
};

//Checks if the given email exists in the database and if it does it returns the password associated with that email
const login = async (email)=>{

    const result = await sellers.findOne({email:email})
    return result.password;
}

module.exports = { save,login };



