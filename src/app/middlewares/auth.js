const jwt = require("jsonwebtoken");
const authConfig = require ("../../config/auth.json")
function auth(req,res,next){
    const authToken = req.headers.authorization;

    if(!authToken ){
        res.status(401).json({error:"token invalid"});
    }
    jwt.verify(authToken,authConfig.secret,(err,data)=>{
        if(err){
            res.status(401).json({error:"token invalid"});
        }
        else{
            req.token= authToken;
            req.loggedUser= {id:data.id,email:data.email};
            next();
        }
    });

}

module.exports =auth;