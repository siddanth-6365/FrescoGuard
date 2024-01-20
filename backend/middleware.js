const User = require('./models/user')
const jwt = require('jsonwebtoken');

module.exports.isLoggedIn = async  (req, res, next) => {   
    const token = req.signedCookies.jwt;
    if(token){
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
        const user = await User.findById(decoded.id);
        if(user) next();
        else res.status(400).json('invalid token');
    }
    else{
        res.status(400).json('no token');
    }
}

