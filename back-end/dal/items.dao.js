let items = null;
const ObjectID = require('mongodb').ObjectID;


setTimeout(() => {
    items = require('./connection').db('shoppingdb').collection('items');
},3000);

const add = async ({name,description,price,category,qty,photo,seller}) => {
    const result = await items.insertOne({name,description,price,category,qty,photo,seller});
    return result.ops[0];
};

const getBySeller =async (seller)=>{

    const results = await items.find({seller:seller.email});
    return results.toArray();

}

const getAll =async ()=>{

    const results = await items.find({});
    return results.toArray();

}

const getByID =async(id)=>{

    return await items.findOne({"_id":ObjectID(id)});

}

const deleteById =async(id)=>{

    return await items.removeOne({"_id":ObjectID(id)})

}

const updateById = async (id,item)=>{

   return await items.updateOne({"_id":ObjectID(id)},{$set:item})

}

const updateQty=async(id,qty)=>{
    return await items.updateOne({"_id":ObjectID(id)},{$set:{qty:qty}})
}


module.exports = { add,getBySeller,getByID,deleteById,updateById,getAll,updateQty};