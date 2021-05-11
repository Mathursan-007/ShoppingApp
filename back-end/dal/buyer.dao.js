let buyers = null;

setTimeout(() => {
    buyers = require('./connection').db('shoppingdb').collection('customers');
},2000);

const save = async ({firstname,lastname, email, phone,address,password}) => {
    const result = await buyers.insertOne({firstname,lastname, email, phone,address,password});
    return result.ops[0];
};

const login = async (email)=>{

    const result = await buyers.findOne({email:email})
    return result.password;
}


module.exports = { save,login };