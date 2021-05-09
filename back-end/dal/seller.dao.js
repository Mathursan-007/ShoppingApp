let sellers = null;

setTimeout(() => {
    sellers = require('./connection').db('shoppingdb').collection('sellers');
},2000);

const save = async ({firstname,lastname, email, phone,address,password}) => {
    const result = await sellers.insertOne({firstname,lastname, email, phone,address,password});
    return result.ops[0];
};

const login = async (email)=>{

    const result = await sellers.findOne({email:email})
    return result.password;
}

module.exports = { save,login };



