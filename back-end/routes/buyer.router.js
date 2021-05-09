const router = require('express').Router();
const jwt =require('jsonwebtoken');
const { createBuyer,loginBuyer,getItems } = require('../api/buyer.api');


router.post('/', async( req,res) => {
    let buyer = req.body;
    buyer = await createBuyer(buyer);
    if(buyer){
        const accessToken=jwt.sign({email:buyer.email},"secret")
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
        const accessToken=jwt.sign({email:user.email},"secret")
        res.send(accessToken);
    }else{
        res.json({error:"User doesn't exist"})
    }

})



router.get("/items",async (req,res)=>{

    let items=await getItems();
    res.send(items);

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


module.exports=router;