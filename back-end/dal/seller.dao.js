let sellers = null;

setTimeout(() => {
    sellers = require('./connection').db('shoppingdb').collection('sellers');
},5000);


//checks whether the user with the given email already exists in db
const checkUser =async (email)=>{

    const result = await sellers.findOne({email:email})
    if(result){
        return true
    }else{
        return false;
    }


}


//inserts a seller record in the db with the given details
const save = async ({firstname,lastname, email, phone,address,password}) => {
    const result = await sellers.insertOne({firstname,lastname, email, phone,address,password});
    return result.ops[0];
};

//Checks if the given email exists in the database and if it does it returns the password associated with that email
const login = async (email)=>{

    const result = await sellers.findOne({email:email})
    if(result){
        return result.password;
    }else{
        return false;
    }
}

module.exports = { save,login,checkUser};



