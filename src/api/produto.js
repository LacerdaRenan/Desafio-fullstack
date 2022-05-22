const {Router} = require('express');
const router = Router();

router.get('/produto', (req,res)=>{
    res.json({
        msg:'Testando rota'
    });
});

module.exports = router;