// ======================
// DATA SETUP
// ======================

const roles = {
  admin: ["create", "update", "delete", "view"],
  student: ["view"]
};

// ======================
// MODULE-4: ROLE & PERMISSION ENGINE
// ======================

// 1. Get all role names
const getRoleNames = (roles) =>
  Object.keys(roles);

// 2. Check if student can delete
const canStudentDelete = (roles) =>
  roles.student.includes("delete");

// 3. Create a flat list of all unique permissions
const getAllUniquePermissions = (roles) =>
  [...new Set(Object.values(roles).flat())];

// 4. Add new role immutably
const addRole = (roles, roleName, permissions) => ({
  ...roles,
  [roleName]: permissions
});

// ======================
// TESTING / OUTPUT
// ======================

console.log("Role Names:", getRoleNames(roles));
console.log("Can Student Delete:", canStudentDelete(roles));
console.log("All Unique Permissions:", getAllUniquePermissions(roles));

const updatedRoles = addRole(roles, "moderator", ["update", "view"]);

console.log("Original Roles:", roles);
console.log("Updated Roles:", updatedRoles);
