let buyers = null;

setTimeout(() => {
    buyers = require('./connection').db('shoppingdb').collection('customers');
},5000);


//inserting the registration details of the buyer to the db to create a new buyer record
const save = async ({firstname,lastname, email, phone,address,password}) => {
    const result = await buyers.insertOne({firstname,lastname, email, phone,address,password});
    return result.ops[0];
};

//checks if the given email exists in the database and if it does it returns the password associated with that email
const login = async (email)=>{

    const result = await buyers.findOne({email:email})
    return result.password;

}


module.exports = { save,login };