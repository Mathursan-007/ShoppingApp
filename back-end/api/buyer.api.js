const bcrypt =require('bcrypt')
const { save,login,checkUser } = require('../dal/buyer.dao');
const { getAll } = require('../dal/items.dao');



//check whether the buyer's email is already registered
const checkBuyer = async (email)=>{
    return await checkUser(email)
}


//passing the registration details to the dal layer to create a new user
const createBuyer = async ({firstname,lastname,email,phone,address,password}) => {

    const buyer = {
        firstname,
        lastname,
        email,
        phone,
        address,
        password:bcrypt.hashSync(password,10) //hashing the text password given at registration
    }

    return await save(buyer);
}

//passing the email address to the dal layer to get the password that has been saved in the db while registering
const loginBuyer = async ({email,password})=>{

    const pwd=await login(email);
    if(pwd){
        if(bcrypt.compareSync(password,pwd)){   //comparing the plain text of the password given at the login and the hashed password saved in the db.
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }


}

//retrieving the item details of all items from the dal
const getItems = async ()=>{
    return await getAll();
}


module.exports = { createBuyer,loginBuyer,getItems,checkBuyer};