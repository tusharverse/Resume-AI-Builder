const { verifyAccessToken } = require('../utils/jwt');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid authorization header' });
    }
    const token = authHeader.split(' ')[1];
    const payload = verifyAccessToken(token);
    if (!payload || !payload.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    const user = await User.findById(payload.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message || err);
    return res.status(401).json({ message: 'Unauthorized', details: err.message });
  }
};

module.exports = authMiddleware;
