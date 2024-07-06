// token.jwt.js

import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  // Define your secret key (can be stored in environment variables)
  const secretKey = process.env.secretKey;

  // Generate JWT token with user data (e.g., user ID)
  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      role: user.role,
    },
    secretKey,
    { expiresIn: '1h' } // Token expiration time (e.g., 1 hour)
  );

  return token;
};


//Middleware to authenticate the user  
const verifyToken = (req) => {
    try {
        const authorizationHeader = req.headersauthorization;
        console.log('Authorization Header:',authorizationHeader);
      
        if (!authorizationHeader) {
        throw new Error('Authentication token ismissing');
        }
      
        const token = authorizationHeader.split(' ')[1];
        console.log('Token:', token);
      
        if (!token) {
        throw new Error('Authentication token ismissing');
        }
      
        const decodedToken = jwt.verify(token,process.env.secretKey);
        console.log('Decoded Token:', decodedToken);
      
        return decodedToken;
    } catch (error) {
        console.error('Token verification error:',error.message);
        throw new Error('Invalid or expired token');
    }
};   

export { generateToken, verifyToken };
