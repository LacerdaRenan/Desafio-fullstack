const { Router } = require('express');
const { sendStatus } = require('express/lib/response');
const Produto = require('../database/models/Produto');
const authenticate = require('../../middlewares/authenticate');
const router = Router();

router.get('/produto/:id?', authenticate, async(req,res)=>{
    const id = req.params.id;
    const user = req.user;

    try{
        if(id){
            const produto = await Produto.findByPk(id);
            if(!produto){
                return res.sendStatus(404);
            }
            return res.status(200).json(produto);
        }

        const produtos = await Produto.findAll();

        if(!produtos){
            return res.sendStatus(404);
        }
        return res.status(200).json(produtos);
    }catch(err){
        return res.status(500).send(err);
    }

});

router.post('/produto', async(req,res)=>{
    let{nome, valor} = req.body

    if(!(valor && nome)) return res.sendStatus(400)

    if(isNaN(valor)){
        return sendStatus(400)
    }

    try{
        
        if((await Produto.findOne({where: {nome:nome}}))) return res.sendStatus(409)
        
        const newProduct = await Produto.create({nome:nome, valor:valor});
        res.status(201).json({newProduct});

    }catch(err){
        return res.status(500).send(err);
    }

});

router.put('/produto/:id', async(req,res)=>{
    const id = req.params.id;
    const {nome, valor} = req.body

    if(!(valor && nome)) return res.sendStatus(400)

    if(isNaN(valor)){
        return sendStatus(400)
    }

    try{
        if(!(await Produto.findByPk(id))) return res.sendStatus(404);
        await Produto.update(
            {
                nome:nome,
                valor:valor
            },
            {where:{id:id}}
        )
        return res.sendStatus(201);
    }catch(err){
        return res.status(500).send(err);
    }

});

router.delete('/produto/:id', async(req,res)=>{
    const id = req.params.id;

    if(!id) return res.sendStatus(400)

    try{
        await Produto.destroy({where: {id:id}});
        return res.sendStatus(200);
    }catch(err){
        return res.status(500).send(err);
    }
});

module.exports = router;