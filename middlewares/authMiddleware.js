const { accordionClasses } = require("@mui/material");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split('-')[1];
    console.log(token,"token")
    if (!token) return res.status(401).send({ message: 'Access denied. No token provided.', success: false });
    
    try {
        const decoded = jwt.verify(token,process.env.jwt_secret); 
        req.body.employeeId = decoded.employeeId;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: 'Access deneid.Invalid token.', success: false });
    }

}   