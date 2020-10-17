const jwt = require("jsonwebtoken");
const authConfig = require ("../../config/auth.json");
function auth(req,res,next){
    const authToken = req.headers.authorization;
    const [, token] = authToken.split(" ");

    
    console.log(token);
    if(!authToken ){
        res.status(401).json({error:"token invalid"});
    }
    jwt.verify(token,authConfig.secret,(err,data)=>{
        if(err){
            res.status(401).json({err:"token invalid"});
        }
        else{
            req.token= authToken;
            req.loggedUser= {id:data.id,email:data.email};
            next();
        }
    });
}
module.exports =auth;