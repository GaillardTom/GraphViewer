const jwt = require('jsonwebtoken');



async function CheckJWT(req, res, next){ 
    const token = req.header("token");
    if (!token) return res.status(401).send({ message: "Auth Error" });

    try {

        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded.user;
        next();

    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Invalid Token" });
    }
}

module.exports = { 
    CheckJWT,
}