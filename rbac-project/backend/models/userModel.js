const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Method to assign roles to a user
userSchema.methods.assignRoles = function (roles) {
  this.roles = roles;
  return this.save();
};

// Method to assign permissions to a user
userSchema.methods.assignPermissions = function (permissions) {
  this.permissions = permissions;
  return this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;
