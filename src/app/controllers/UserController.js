const User = require("../models/User");
const jwt = require ("jsonwebtoken");
const authConfig = require ("../../config/auth.json")


function generateToken (params) {
    return jwt.sign({ params }, authConfig.secret, { expiresIn: '48h' })
}
module.exports = {
    async store(req,res){
        const {name,email,password} = req.body;

        const userExist = await User.findOne({ where: { name } });

        if (userExist){
            return res.status(200).json("User already exists!");
        }
        const user = await User.create({name,email,password});
        return res.status(201).json(user);

    },
    async index(req,res){
        const user=await User.findAll();
        return res.status(200).json({user});
    },
    async authentication(req,res){
        if(await req.body.email == undefined){
            return res.status(400).json({error:"email inválido"});
        }
        const user = await User.findOne({ where: {email: req.body.email } });
        if(!user){
            return res.status(404).json({error:"email invalid credential"});
        }
       const SenhaExist = await User.findOne({ where: { password:req.body.password } }); 
       if(!SenhaExist){
        return res.status(401).json({error:"password invalid credential"});
       }
       const { id, name, email} = user;

       
       return res.status(200).json({ id, name, email,token: generateToken({ id, email })})
    
       

    }
}
