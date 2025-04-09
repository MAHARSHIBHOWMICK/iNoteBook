var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodboy';


const fetchuser = (req, res ,next)=>{
    //Get the user form the jwt token and id to req object .
    const token = req.header('authToken');
    if(!token){
        res.status(401).send({error:"please auhtenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"please auhtenticate "})
    }
}


module.exports = fetchuser;