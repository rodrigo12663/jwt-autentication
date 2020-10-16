const User = require("../../database/models/User");
const jwt = require ("jsonwebtoken");

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
        const {email,password} = req.body;

        if(await email == undefined){
            return res.status(400).json({error:"email inválido"});
        }
        const EmailExist = await User.findOne({ where: { email } });
        if(!EmailExist){
            return res.status(404).json({error:"email invalid credential"});
        }
       const SenhaExist = await User.findOne({ where: { password } }); 
       if(!SenhaExist){
        return res.status(401).json({error:"password invalid credential"});
       }
       return res.status(200).json({token:"token falso!"});
       

    }
}
