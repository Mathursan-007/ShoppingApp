const router = require('express').Router();
const jwt =require('jsonwebtoken');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { createSeller,loginSeller,addItem,getItems,deleteItem,updateItem,checkSeller} = require('../api/seller.api');
const {auth}=require('../middleware/auth')

//Defining the location of the image and renaming the file name
const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null,'../sellerclient/src/images');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }

});

//Copying the image uploaded to the seller's folder to the buyer's folder
function fileUpload(filename){

    fs.copyFile('../sellerclient/src/images/'+filename, '../buyerclient/src/images/'+filename, (err) => {

        if (err) throw err;

    });

}

//Defining the file formats which are accepted
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

//Providing the location and type of file to multer
let upload = multer({ storage, fileFilter });


//Creating a seller with the given inputs received from the client request
router.post("/",async (req,res)=>{

    let seller =req.body;
    seller=await checkSeller(seller.email);//check whether the email is already registered or not
    if(seller){
        res.status(502).send("Registration failed");
    }else{
        seller=await createSeller(req.body);
        if(seller){
            const accessToken=jwt.sign({email:req.body.email},"secret")//creating the jwt token using the email and a string value
            res.status(201).send(accessToken);
        }else{
            res.status(502).json("Registration failed");
        }
    }


})


//checks if the user exists with the given username and password
router.post("/login",async(req,res)=>{

    let user = req.body;
    let loginUser=await loginSeller(user);
    if(loginUser==true){
        const accessToken=jwt.sign({email:user.email},"secret")
        res.status(201).send(accessToken);
    }else{
        res.status(502)
    }

})

//create an item using the items details that has been provided by the seller
router.post("/add",auth,upload.single('photo'),async (req,res)=>{


     let photo=req.file.filename;//assigning the filename to the photo variable
     let item=await addItem(req.body,req.id,photo);

     if(item) {

        fileUpload(photo);
        res.status(201).send("Item added");

     } else {

        res.status(502).json({error:"Item wasn't added"})

     }


})

//retrieve all the items created by a particular seller
router.get("/items",auth,async (req,res)=>{

    let items=await getItems(req.id);

    if(items){
        res.status(201).send(items);
    }else{
        res.status(502).json({error:"Items not available"})
    }

})

// router.get("/:id",async (req,res)=>{
//     let item=await getItem(req.params.id);
//
//     if(item){
//         res.status(201).send(item);
//     }else{
//         res.status(502).json({error:"Item doesn't exist"})
//     }
// })

//delete a particular item with a given item id
router.delete("/:id",async (req,res)=>{

    let item = await deleteItem(req.params.id);

    if(item){
        res.status(201).send("deleted");
    }else{
        res.status(502).json({error:"Item wasn't deleted"})
    }

})

//used to update the modified fields of the existing item
router.patch("/:id",async(req,res)=>{

    let item=req.body;
    await updateItem(req.params.id,item)

    if(item){
        res.status(201).send("updated");
    }else{
        res.status(502).json({error:"Item wasn't updated"})
    }

})



module.exports=router;