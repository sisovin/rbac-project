const rolesPermissions = {
  admin: {
    permissions: [
      'create_user',
      'read_user',
      'update_user',
      'delete_user',
      'assign_role',
      'create_role',
      'read_role',
      'update_role',
      'delete_role',
      'create_permission',
      'read_permission',
      'update_permission',
      'delete_permission',
    ],
  },
  user: {
    permissions: [
      'read_user',
      'update_user',
    ],
  },
  guest: {
    permissions: [
      'read_user',
    ],
  },
};

module.exports = rolesPermissions;
