const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// User management endpoints
router.post('/users', authenticate, authorize(['create_user']), userController.createUser);
router.get('/users', authenticate, authorize(['read_user']), userController.getUsers);
router.get('/users/:id', authenticate, authorize(['read_user']), userController.getUserById);
router.put('/users/:id', authenticate, authorize(['update_user']), userController.updateUser);
router.delete('/users/:id', authenticate, authorize(['delete_user']), userController.deleteUser);

// Role assignment endpoint
router.post('/users/:id/roles', authenticate, authorize(['assign_role']), userController.assignRoles);

module.exports = router;
