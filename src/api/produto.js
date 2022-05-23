const {Router} = require('express');
const { sendStatus } = require('express/lib/response');
const Produto = require('../database/models/Produto');
const router = Router();

router.get('/produto/:id?', (req,res)=>{
    const id = req.params.id;

    if(id){
        Produto.findByPk(id).then((data)=>{
            res.status(200);
            res.json(data);
        })
    }else{
        Produto.findAll().then((data)=>{
            res.status(200);
            res.json(data);
        })
    }
});

router.post('/produto', (req,res)=>{
    let nome = req.body.nome;
    let valor = req.body.valor;

    Produto.create({
        nome:nome,
        valor:valor
    }).then(()=>{
        res.sendStatus(201);
    }).catch(e=>res.status(500).send('Error'));
});

router.put('/produto/:id', (req,res)=>{
    const id = req.params.id;
    const {nome, valor} = req.body

    Produto.findByPk(id).then(data=>{
        if(data){
            Produto.update(
                {
                    nome: nome,
                    valor: valor
                },
                {where: {id:id}}
            ).then(()=>res.sendStatus(200)).catch(()=>res.sendStatus(500))
        }
    }).catch(()=>sendStatus(404));
})



module.exports = router;