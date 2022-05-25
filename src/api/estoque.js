const { Router } = require('express');
const { sendStatus } = require('express/lib/response');
const Produto = require('../database/models/Produto');
const Estoque = require('../database/models/Estoque');
const authenticate = require('../../middlewares/authenticate');
const router = Router();

router.post('/estoque', async(req,res)=>{
    const {produtoId, valor} = req.body;

    try{
        await Estoque.create({produtoId:produtoId, valor:valor});
        return res.sendStatus(201);

    }catch(err){
        return res.status(500).json(err);
    }

})

module.exports = router;