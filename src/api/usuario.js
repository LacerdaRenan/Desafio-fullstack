const {Router} = require('express');
const {Op} = require('sequelize');
const Users = require('../database//models/Users');
const jwt = require('jsonwebtoken');
const router = Router();

router.post('/create-user', async(req,res)=>{
    const {email,password} = req.body;
    try{
        await Users.create({
            email:email,
            password:password
        });
        return res.sendStatus(201);
    }catch(err){
        return res.status(500).send(err);
    }
})

router.post('/login', async(req,res)=>{
    const {email, password} = req.body;
    try{

        const user = await Users.findOne({where: {[Op.and]:[{email:email},{password:password}]}});

        if(!user) return res.sendStatus(401);

        const token = jwt.sign({
            id_user: user.id,
            email: user.email
        }, '12345678', {expiresIn: 600});

        return res.status(202).json({token:token})

    }catch(err){
        return res.status(500).send(err);
    }
});

module.exports=router;