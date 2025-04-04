const { User, Role } = require('../config/database');

// Create a new user
const createUser = async (req, res) => {
  const { username, password, roles } = req.body;

  try {
    const newUser = new User({ username, password, roles });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('roles');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate('roles');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, roles } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, password, roles },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Assign roles to a user
const assignRoles = async (req, res) => {
  const { id } = req.params;
  const { roles } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const roleDocs = await Role.find({ _id: { $in: roles } });
    user.roles = roleDocs.map(role => role._id);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  assignRoles,
};
