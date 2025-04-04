const mongoose = require('mongoose');

// Role schema
const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
});

// Method to assign permissions to a role
roleSchema.methods.assignPermissions = function (permissions) {
  this.permissions = permissions;
  return this.save();
};

// Method to get all roles
roleSchema.statics.getAllRoles = function () {
  return this.find();
};

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
