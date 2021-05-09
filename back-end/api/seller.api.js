const bcrypt =require('bcrypt')
const { save,login } = require('../dal/seller.dao');
const { add,getBySeller,deleteById,getByID,updateById} = require('../dal/items.dao');

const createSeller = async ({firstname,lastname, email, phone,address,password}) => {

    const seller = {
        firstname,
        lastname,
        email,
        phone,
        address,
        password:bcrypt.hashSync(password,10)
    }

    return await save(seller);
}

const loginSeller = async ({email,password})=>{

    const pwd=await login(email);
    if(bcrypt.compareSync(password,pwd)){
        return true;
    }else{
        return false;
    }

}

const addItem = async({name,description,price,category,qty},seller,photo)=>{

    const item = {
        name,
        description,
        price:Number(price),
        category,
        qty:Number(qty),
        photo,
        seller:seller.email
    }
    return await add(item);

}

const getItems = async (seller)=>{
    return await getBySeller(seller);
}

const getItem = async (id)=>{
    return getByID(id)
}

const deleteItem =async (id)=>{
    return await deleteById(id);
}

const updateItem = async(id,item)=>{
    return await updateById(id,item)
}

module.exports = { createSeller,loginSeller,addItem ,getItems,deleteItem,getItem,updateItem};