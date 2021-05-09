const bcrypt =require('bcrypt')
const { save,login } = require('../dal/buyer.dao');
const { getAll } = require('../dal/items.dao');

const createBuyer = async ({firstname,lastname,email,phone,address,password}) => {

    const buyer = {
        firstname,
        lastname,
        email,
        phone,
        address,
        password:bcrypt.hashSync(password,10)
    }

    return await save(buyer);
}

const loginBuyer = async ({email,password})=>{

    const pwd=await login(email);
    if(bcrypt.compareSync(password,pwd)){
        return true;
    }else{
        return false;
    }

}

const getItems = async ()=>{
    return await getAll();
}


module.exports = { createBuyer,loginBuyer,getItems};