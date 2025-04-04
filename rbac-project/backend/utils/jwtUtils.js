const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');

const createToken = (payload) => {
  return jwt.sign(payload, authConfig.jwt.secret, { expiresIn: authConfig.jwt.expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, authConfig.jwt.secret);
};

const handleTokenExpiration = (token) => {
  try {
    const decoded = jwt.verify(token, authConfig.jwt.secret);
    return { valid: true, expired: false, decoded };
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return { valid: false, expired: true, decoded: null };
    }
    return { valid: false, expired: false, decoded: null };
  }
};

module.exports = {
  createToken,
  verifyToken,
  handleTokenExpiration,
};
