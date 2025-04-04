const mongoose = require('mongoose');

// Permission schema
const permissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

// Method to create a new permission
permissionSchema.statics.createPermission = function (name, description) {
  const permission = new this({ name, description });
  return permission.save();
};

// Method to get all permissions
permissionSchema.statics.getAllPermissions = function () {
  return this.find();
};

// Method to update a permission
permissionSchema.statics.updatePermission = function (id, name, description) {
  return this.findByIdAndUpdate(id, { name, description }, { new: true });
};

// Method to delete a permission
permissionSchema.statics.deletePermission = function (id) {
  return this.findByIdAndDelete(id);
};

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
