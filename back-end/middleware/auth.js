const jwt =require('jsonwebtoken');

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

module.exports={auth}