const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
        
    }catch(error){
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

module.exports = validateJWT;