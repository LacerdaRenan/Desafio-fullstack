const {Router} = require('express');
const Users = require('../database//models/Users');
const router = Router();

router.post('/user', (req,res)=>{
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

module.exports=router;