const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const authorize = require('../middleware/authorize');

// Define role management endpoints
router.post('/roles', authorize(['create_role']), roleController.createRole);
router.get('/roles', authorize(['read_role']), roleController.getRoles);
router.put('/roles/:roleId/permissions', authorize(['assign_role']), roleController.assignPermissions);
router.get('/permissions', authorize(['read_permission']), roleController.getPermissions);

module.exports = router;
