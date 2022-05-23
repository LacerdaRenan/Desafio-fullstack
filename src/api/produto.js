const {Router} = require('express');
const { sendStatus } = require('express/lib/response');
const Produto = require('../database/models/Produto');
const Users  =require('../database/models/Users');
const authenticate = require('../../middlewares/authenticate');
const router = Router();

router.get('/produto/:id?', authenticate, (req,res)=>{
    const id = req.params.id;

    if(id){
        Produto.findByPk(id)
            .then((data)=>{
                if(data){
                    res.status(200);
                    res.json(data);
                }else{
                    res.sendStatus(404);
                }
            })
            .catch(()=>res.sendStatus(500));
    }else{
        Produto.findAll()
            .then((data)=>{
                if(data){
                    res.status(200);
                    res.json(data);
                }else{
                    res.sendStatus(404);
                }
            })
            .catch(()=>res.sendStatus(500));
    }
});

router.post('/produto', (req,res)=>{
    let nome = req.body.nome;
    let valor = req.body.valor;

    /**
     * Realizar validação:
     * Verificar se produto já não existe,
     * Verificar se valor do produto é numérico
     */

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

    /**
     * Realizar validação:
     * Verificar se produto já não existe,
     * Verificar se valor do produto é numérico
     */

    Produto.findByPk(id)
        .then(data=>{
            if(data){
                Produto.update(
                    {
                        nome: nome,
                        valor: valor
                    },
                    {where: {id:id}}
                )
                .then(()=>res.sendStatus(200))
                .catch(()=>res.sendStatus(500))
        }
        })
        .catch(()=>sendStatus(404));
});

router.delete('/produto/:id', (req,res)=>{
    const id = req.params.id;

    Produto.destroy({
        where: {
            id:id
        }
    })
    .then(()=>res.sendStatus(200)
    .catch(res.sendStatus(400)))
});

module.exports = router;