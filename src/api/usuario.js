const {Router} = require('express');
const {Op} = require('sequelize');
const Users = require('../database//models/Users');
const router = Router();

router.post('/create-user', (req,res)=>{
    const {email,password} = req.body;

    Users.findOne({
        where: {
            email:email
        }
    }).then(data=>{
        if(data){
            res.sendStatus(401);
        }else{
            Users.create({
                email:email,
                password:password
            }).then(()=>res.sendStatus(201)).catch((e)=>res.send(e));
        }
    }).catch(e=>{res.send(e)});
})

router.post('/login', (req,res)=>{
    const {email, password} = req.body;

    Users.findOne({
        where: {
            [Op.and]:[
                {email:email},
                {password:password}
            ]
        }
    }).then(data=>{
        if(data){
            res.status(202).send([
                {data},
                {msg:'Usuario logado'}
            ])
        }else{
            res.status(401).send({
                msg: 'Dados incorretos'
            })
        }
    }).catch(e=>res.send(e));

});

module.exports=router;