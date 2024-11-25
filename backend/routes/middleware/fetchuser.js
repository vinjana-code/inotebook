const jwt = require("jsonwebtoken");
const JWT_SECRET = "$$ITHUvaliyasHal34##yam";

const fetchuser = (req, res, next) => {
    //get the user form the jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate a valid token"});
    }
    try{
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user;
        next();
    }catch{
        res.status(401).send({error: "Please authenticate"});
    }
    
    
}

module.exports = fetchuser;