const router = require('express').Router();
const jwt =require('jsonwebtoken');
const { createBuyer,loginBuyer,getItems } = require('../api/buyer.api');
const { validateCard } = require('../api/cardPayment.api');
const { validateMobile } = require('../api/mobilePayment.api');
const { validateDelivery } = require('../api/delivery.api');
const { auth }=require('../middleware/auth')


//creating a buyer with the given inputs received from the client request
router.post('/', async( req,res) => {
    let buyer = req.body;
    buyer = await createBuyer(buyer);
    if(buyer){
        const accessToken=jwt.sign({email:buyer.email},"secret",{expiresIn: 1500})
        res.status(201).send(accessToken);
    }else{
        res.send(502).send("Registration failed");
    }
});

//checks if the user exists with the given username and password
router.post("/login",async(req,res)=>{

    let user = req.body;
    let loginUser=await loginBuyer(user);
    if(loginUser==true){
        const accessToken=jwt.sign({email:user.email},"secret",{expiresIn: 1500});
        res.status(201).send(accessToken);
    }else{
        res.status(502).json({error:"User doesn't exist"})
    }

})


//retrieve all the items created by a particular seller and pass as response
router.get("/items",async (req,res)=>{

    let items=await getItems();
    if(items){

        res.status(201).send(items);
    }else{

        res.status(502).send("Error");
    }


})

//pass necessary details for the card payment and calls for validation of those details
router.post("/cardpay",auth,(req,res)=>{


    let card=req.body;
    let pay =validateCard(new String(card.cardHolder),new Number(card.cardNo), new Number(card.cvcCode),new Number(card.total));

    if(pay){
        res.status(201).send(pay);
    }else{
        res.status(502).send(pay);
    }


})

//pass necessary details for the mobile payment and calls for validation of those details
router.post("/mobilepay",auth,(req,res)=>{


    let mobile=req.body;
    let pay =validateMobile(new Number(mobile.phoneNo),new Number(mobile.pin),new Number(mobile.total));

    if(pay){
        res.status(201).send(pay);
    }else{
        res.status(502).send(pay);
    }

})


//pass necessary details for the item delivery and calls for validation of those details
router.post("/deliver",auth,async (req,res)=>{


    let delivery = req.body;
    let deliver = await validateDelivery(new String(delivery.deliveryAddress),delivery.orders,req.id);

    if(deliver){
        res.status(201).send(deliver);
    }else{
        res.status(502).send(deliver);
    }
    

})


module.exports=router;