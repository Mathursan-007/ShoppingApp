let items = null;
const ObjectID = require('mongodb').ObjectID;


setTimeout(() => {
    items = require('./connection').db('shoppingdb').collection('items');
},5000);

//inserting the item details to the db to create a new item record
const add = async ({name,description,price,category,qty,photo,seller}) => {
    const result = await items.insertOne({name,description,price,category,qty,photo,seller});
    return result.ops[0];
};

//retrieving the items records from the db based on the seller who added it
const getBySeller =async (seller)=>{

    const results = await items.find({seller:seller.email});
    return results.toArray();

}

//retrieving all the items records from the db
const getAll =async ()=>{

    const results = await items.find({});
    return results.toArray();

}


//deleting a particular item record from the db
const deleteById =async(id)=>{

    return await items.removeOne({"_id":ObjectID(id)})

}

//updating the changed fields of a particular item in the db
const updateById = async (id,item)=>{

   return await items.updateOne({"_id":ObjectID(id)},{$set:item})

}

//updating the quantity of an item that has been purchased
const updateQty=async(id,qty)=>{
    return await items.updateOne({"_id":ObjectID(id)},{$set:{qty:qty}})
}


module.exports = { add,getBySeller,deleteById,updateById,getAll,updateQty};