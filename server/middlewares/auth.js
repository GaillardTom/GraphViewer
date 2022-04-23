const jwt = require('jsonwebtoken');



async function CheckJWT(req, res, next){ 
    const token = req.header("token");
    if (!token) return res.status(401).send({ message: "Auth Error" });

    try {

        const decoded = jwt.verify(token, process.env.SECRET);
        console.log('decoded: ', decoded);
        ///console.log('req.user: ', req.user);
        next();

    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Please log in first" });
    }
}

async function GetUserIDWithJWT(token){ 
    try{ 
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log('decoded: ', decoded);
        return decoded._id

    }catch(e){ 
        console.error(e);
        return false
    }
}

module.exports = { 
    CheckJWT,GetUserIDWithJWT
}