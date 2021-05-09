const router = require('express').Router();
const jwt =require('jsonwebtoken');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { createSeller,loginSeller,addItem,getItems,deleteItem,getItem,updateItem} = require('../api/seller.api');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'../sellerclient/src/images');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

function fileUpload(filename){

    fs.copyFile('../sellerclient/src/images/'+filename, '../buyerclient/src/images/'+filename, (err) => {

        if (err) throw err;

    });

}

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.route("/").post(async (req,res)=>{
    let seller =req.body;
    seller=await createSeller(seller);
    if(seller){
        const accessToken=jwt.sign({email:seller.email},"secret")
        res.send(accessToken);
    }else{
        res.json("Registration failed");
    }

})


router.post("/login",async(req,res)=>{

    let user = req.body;
    let loginUser=await loginSeller(user);
    if(loginUser==true){
        const accessToken=jwt.sign({email:user.email},"secret")
        res.send(accessToken);
    }else{
        res.json({error:"User doesn't exist"})
    }

})

router.post("/add",auth,upload.single('photo'),async (req,res)=>{


     let photo=req.file.filename;
     await addItem(req.body,req.id,photo);
     fileUpload(photo);
     res.send("Item added");

})


router.get("/items",auth,async (req,res)=>{

    let items=await getItems(req.id);
    res.send(items);

})

router.get("/:id",async (req,res)=>{
    let item=await getItem(req.params.id);
    res.send(item);
})


router.delete("/:id",async (req,res)=>{

    await deleteItem(req.params.id);
    res.send("deleted");

})

router.patch("/:id",async(req,res)=>{

    let item=req.body;
    await updateItem(req.params.id,item)
    res.send("updated");

})


function auth(req,res,next){

    const authHeader=req.header('authorization');

    //check token
    if(authHeader==null){
        return res.status(401).json({error:"Access-denied"});
    }

    //check validity
    try{
        const verified=jwt.verify(authHeader,"secret");

        req.id={email:verified.email};
        next();

    }catch (e){
        res.status(401).json({error:"Invalid-token"});
    }

}


function auth(req,res,next){

    const authHeader=req.header('authorization');

    //check token
    if(authHeader==null){
        return res.status(401).json({error:"Access-denied"});
    }

    //check validity
    try{
        const verified=jwt.verify(authHeader,"secret");

        req.id={email:verified.email};
        next();

    }catch (e){
        res.status(401).json({error:"Invalid-token"});
    }

}


module.exports=router;