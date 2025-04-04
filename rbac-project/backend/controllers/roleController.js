const Role = require('../models/roleModel');
const Permission = require('../models/permissionModel');

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const role = new Role({ name, permissions });
    await role.save();
    res.status(201).json({ message: 'Role created successfully', role });
  } catch (error) {
    res.status(500).json({ message: 'Error creating role', error });
  }
};

// Get all roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roles', error });
  }
};

// Assign permissions to a role
exports.assignPermissions = async (req, res) => {
  try {
    const { roleId, permissions } = req.body;
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    role.permissions = permissions;
    await role.save();
    res.status(200).json({ message: 'Permissions assigned successfully', role });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning permissions', error });
  }
};

// Get all permissions
exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching permissions', error });
  }
};
