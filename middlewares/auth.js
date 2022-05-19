const jwt = require('jsonwebtoken');
function valideToken(req,res,next) {
    let token = req.headers['x-access-token'];
    if(!token)
        return res.status(200).json({ message : 'A token is required.'});
    try {
        let decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.user=decoded;
        console.log(req.user)
    } catch (error) {
        return res.status(200).json({ message : 'Invalid Token : '+error.message });
    }
    next();
};

module.exports=valideToken;