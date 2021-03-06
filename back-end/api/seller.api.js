const bcrypt =require('bcrypt')
const { save,login,checkUser} = require('../dal/seller.dao');
const { add,getBySeller,deleteById,updateById} = require('../dal/items.dao');

//check whether the seller's email is already registered
const checkSeller = async (email)=>{
    return await checkUser(email)
}


//passing the seller details to the dal layer
const createSeller = async ({firstname,lastname, email, phone,address,password}) => {

    const seller = {
        firstname,
        lastname,
        email,
        phone,
        address,
        password:bcrypt.hashSync(password,10)//hashing the text password given at registration
    }

    return await save(seller);
}


//checks if email exists and if it does, it returns the password of that user from the dal layer then it compares both passwords
//if the passwords match it returns true if it doesn't it returns false
const loginSeller = async ({email,password})=>{

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

//passing the item with the given inputs to the dal layer
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

//retrieving all the items created by a particular seller from the dal layer
const getItems = async (seller)=>{
    return await getBySeller(seller);
}


//passing the item id of the item that need to deleted
const deleteItem =async (id)=>{
    return await deleteById(id);
}


//passing the modified details of a specific item with the given item id
const updateItem = async(id,item)=>{
    return await updateById(id,item)
}


module.exports = { createSeller,loginSeller,addItem ,getItems,deleteItem,updateItem,checkSeller};