const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../config/database');
const authConfig = require('../config/authConfig');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id, roles: user.roles }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports = {
  login,
};
