const { Router } = require('express');
const { sendStatus } = require('express/lib/response');
const Produto = require('../database/models/Produto');
const Estoque = require('../database/models/Estoque');
const authenticate = require('../../middlewares/authenticate');
const router = Router();

router.get('/estoque-produto/:produtoId?', async(req,res)=>{
    const produtoId = req.params.produtoId;

    if(produtoId){
        try{
            const produtoXestoque = await Estoque.findOne({
                where: {
                    produtoId:produtoId
                },
                include: Produto
            });

            return res.status(200).json(produtoXestoque);
        }catch(err){
            return res.status(500).json(err)
        }
    }

    try{
        const produtoXestoque = await Estoque.findAll({include: Produto});
        return res.status(200).json(produtoXestoque);
    }catch(err){
        return res.status(500).json(err)
    }
})

router.post('/estoque',authenticate, async(req,res)=>{
    const {produtoId,valor} = req.body;
    if(!(produtoId && valor)) return res.status(400).json({msg:'Valores inválidos'})

    try{
        await Estoque.create({produtoId:produtoId, valor:valor});
        return res.sendStatus(201);

    }catch(err){
        return res.status(500).json(err);
    }

});

router.put('/estoque/:produtoId', async(req,res)=>{
    const {valor} = req.body;
    const {produtoId} = req.params;

    if((valor==undefined)) return res.sendStatus(400);

    try{
        await Estoque.update(
            {
                valor:valor
            },
            {
                where:{produtoId:produtoId}
            }
        );
        return res.sendStatus(200);

    }catch(err){
        return res.status(500).json(err);
    }

})

router.delete('/estoque/:produtoId',authenticate, async(req,res)=>{
    const {produtoId} = req.params;

    try{
        await Estoque.destroy({where:{produtoId:produtoId}});
        return res.sendStatus(200);
    }catch(err){
        return res.status(500).json(err)
    }
})

module.exports = router;