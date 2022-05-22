const {Router} = require('express');
const Produto = require('../database/models/Produto');
const router = Router();

router.get('/produto', (req,res)=>{
    res.json({
        msg:'Testando rota'
    });
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