# Roles and Permissions

This document provides a detailed mapping of roles and permissions for the RBAC implementation in this project.

## Roles

### Admin
- **Description**: The admin role has full access to all resources and operations.
- **Permissions**:
  - create_user
  - read_user
  - update_user
  - delete_user
  - assign_role
  - create_role
  - read_role
  - update_role
  - delete_role
  - create_permission
  - read_permission
  - update_permission
  - delete_permission

### User
- **Description**: The user role has limited access to resources and operations.
- **Permissions**:
  - read_user
  - update_user

### Guest
- **Description**: The guest role has minimal access to resources and operations.
- **Permissions**:
  - read_user

## Permissions

### User Management
- **create_user**: Allows creating a new user.
- **read_user**: Allows reading user information.
- **update_user**: Allows updating user information.
- **delete_user**: Allows deleting a user.

### Role Management
- **assign_role**: Allows assigning roles to users.
- **create_role**: Allows creating a new role.
- **read_role**: Allows reading role information.
- **update_role**: Allows updating role information.
- **delete_role**: Allows deleting a role.

### Permission Management
- **create_permission**: Allows creating a new permission.
- **read_permission**: Allows reading permission information.
- **update_permission**: Allows updating permission information.
- **delete_permission**: Allows deleting a permission.

## Examples

### Example 1: Admin Role
An admin user can perform all operations, including creating, reading, updating, and deleting users, roles, and permissions.

### Example 2: User Role
A user can read and update their own information but cannot create or delete users, roles, or permissions.

### Example 3: Guest Role
A guest can only read user information and cannot perform any other operations.
