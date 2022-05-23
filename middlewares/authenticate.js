const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try{
        const decode = jwt.verify(req.headers.authorization.split(' ')[1], '12345678');
        req.user = decode;
        next();
    }catch(err){
        return res.sendStatus(401);
    }
}