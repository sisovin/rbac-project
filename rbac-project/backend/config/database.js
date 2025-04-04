const mongoose = require('mongoose');

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

// User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
});

const User = mongoose.model('User', userSchema);

// Role model
const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
});

const Role = mongoose.model('Role', roleSchema);

// Permission model
const permissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = {
  connectDB,
  User,
  Role,
  Permission,
};
