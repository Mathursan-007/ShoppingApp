const router = require('express').Router();
const jwt =require('jsonwebtoken');
const { createBuyer,loginBuyer,getItems } = require('../api/buyer.api');
const { validateCard } = require('../api/cardPayment.api');
const { validateMobile } = require('../api/mobilePayment.api');
const { validateDelivery } = require('../api/delivery.api');
const { auth }=require('../middleware/auth')

router.post('/', async( req,res) => {
    let buyer = req.body;
    buyer = await createBuyer(buyer);
    if(buyer){
        const accessToken=jwt.sign({email:buyer.email},"secret",{expiresIn: 1500})
        res.status = 201;
        res.send(accessToken);
    }else{
        res.json("Registration failed");
    }
});

router.post("/login",async(req,res)=>{

    let user = req.body;
    let loginUser=await loginBuyer(user);
    if(loginUser==true){
        const accessToken=jwt.sign({email:user.email},"secret",{expiresIn: 1500});
        res.status(201).send(accessToken);
    }else{console.log(pay)
        res.status(502).json({error:"User doesn't exist"})
    }

})



router.get("/items",async (req,res)=>{

    let items=await getItems();
    if(items){
        res.status(201).send(items);
    }else{
        res.status(502).send("Error");
    }


})


router.post("/cardpay",auth,(req,res)=>{


    let card=req.body;
    let pay =validateCard(new String(card.cardHolder),new Number(card.cardNo), new Number(card.cvcCode),new Number(card.total));

    res.send(pay);


})

router.post("/mobilepay",auth,(req,res)=>{



    let mobile=req.body;
    let pay =validateMobile(new Number(mobile.phoneNo),new Number(mobile.pin),new Number(mobile.total));

    res.send(pay);


})



router.post("/deliver",auth,async (req,res)=>{


    let delivery = req.body;
    let deliver = await validateDelivery(new String(delivery.deliveryAddress),delivery.orders,req.id);
    res.send(deliver);

})


module.exports=router;