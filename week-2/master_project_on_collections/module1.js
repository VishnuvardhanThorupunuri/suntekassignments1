// ======================
// DATA SETUP
// ======================

const users = [
  { id: 1, name: "Ravi", role: "student", active: true },
  { id: 2, name: "Anil", role: "admin", active: true },
  { id: 3, name: "Suman", role: "student", active: false }
];

const courses = [
  { id: 101, title: "JavaScript", price: 999, published: true },
  { id: 102, title: "React", price: 1499, published: false },
  { id: 103, title: "Node", price: 1299, published: true }
];

const cart = [
  { courseId: 101, qty: 1 },
  { courseId: 103, qty: 2 }
];

const roles = {
  admin: ["create", "update", "delete", "view"],
  student: ["view"]
};

// ======================
// MODULE-1: USER PROCESSING ENGINE
// ======================

// 1. Get only active users
const getActiveUsers = (users) =>
  users.filter(user => user.active);

// 2. Extract names of active users
const getActiveUserNames = (users) =>
  users.filter(user => user.active).map(user => user.name);

// 3. Check if any admin exists
const isAdminPresent = (users) =>
  users.some(user => user.role === "admin");

// 4. Find user by id
const findUserById = (users, id) =>
  users.find(user => user.id === id);

// 5. Deactivate a user immutably
const deactivateUser = (users, id) =>
  users.map(user =>
    user.id === id ? { ...user, active: false } : user
  );

// ======================
// TESTING / OUTPUT
// ======================

console.log("Active Users:", getActiveUsers(users));
console.log("Active User Names:", getActiveUserNames(users));
console.log("Is Admin Present:", isAdminPresent(users));
console.log("Find User (ID=3):", findUserById(users, 3));

const updatedUsers = deactivateUser(users, 1);

console.log("Original Users:", users);
console.log("Updated Users:", updatedUsers);
