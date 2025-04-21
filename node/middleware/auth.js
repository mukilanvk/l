import jwt from 'jsonwebtoken';

export const verifyToken=(req,res,next) =>{
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
      }
    
      const token = authHeader.split(' ')[1]; 
      console.log(token);
    
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        console.log(decoded);
        next();
      } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
    };
    
    
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only can access.' });
  }
  next();
}
    

