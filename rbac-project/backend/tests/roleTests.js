const request = require('supertest');
const app = require('../server');
const Role = require('../models/roleModel');
const Permission = require('../models/permissionModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('Role-Based Access Control Tests', () => {
  let token;
  let roleId;
  let permissionId;

  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const permission = new Permission({ name: 'test_permission', description: 'Test permission' });
    await permission.save();
    permissionId = permission._id;

    const role = new Role({ name: 'test_role', permissions: [permissionId] });
    await role.save();
    roleId = role._id;

    const user = new User({ username: 'test_user', password: 'password', roles: [roleId] });
    await user.save();

    token = jwt.sign({ userId: user._id, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Role.deleteMany({});
    await Permission.deleteMany({});
    await mongoose.connection.close();
  });

  test('Assign role to user', async () => {
    const res = await request(app)
      .post('/api/roles/assign')
      .set('Authorization', `Bearer ${token}`)
      .send({ userId: user._id, roleId });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Role assigned successfully');
  });

  test('Assign permission to role', async () => {
    const res = await request(app)
      .post('/api/roles/assign-permissions')
      .set('Authorization', `Bearer ${token}`)
      .send({ roleId, permissions: [permissionId] });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Permissions assigned successfully');
  });

  test('Access protected route with valid role', async () => {
    const res = await request(app)
      .get('/api/protected')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Access granted');
  });

  test('Access protected route with invalid role', async () => {
    const invalidToken = jwt.sign({ userId: user._id, roles: [] }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const res = await request(app)
      .get('/api/protected')
      .set('Authorization', `Bearer ${invalidToken}`);

    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toEqual('Access denied');
  });
});
