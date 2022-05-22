const {Router} = require('express');
const Produto = require('../database/models/Produto');
const router = Router();

router.get('/produto', (req,res)=>{
    Produto.findAll().then((data)=>{
        res.status(200);
        res.json(data);
    })
});

router.get('/produto/:id', (req,res)=>{
    const id = req.params.id;
    Produto.findByPk(id).then((data)=>{
        res.status(200);
        res.json(data);
    })
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



module.exports = router;