const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, authConfig.jwt.secret, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    req.userRoles = decoded.roles;
    next();
  });
};

module.exports = authenticate;
