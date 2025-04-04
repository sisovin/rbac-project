const rolesPermissions = require('../config/rolesPermissions');

const authorize = (requiredPermissions) => {
  return (req, res, next) => {
    const userRoles = req.userRoles;

    if (!userRoles || userRoles.length === 0) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const userPermissions = userRoles.reduce((acc, role) => {
      const rolePermissions = rolesPermissions[role]?.permissions || [];
      return acc.concat(rolePermissions);
    }, []);

    const hasPermission = requiredPermissions.every(permission =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };
};

module.exports = authorize;
