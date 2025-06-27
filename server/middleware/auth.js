const jwt = require('jsonwebtoken');
const JWT_Secret = process.env.JWT_Secret;


const token = req.header('Authorization');
if (!token) return res.status(401).json({ message: 'Access denied' });

try{
    const verified= jwt.verify(token, JWT_Secret);
    req.user = verified;
    next() 
}
catch {
    res.status(400).json({ message: 'Invalid token' });
}