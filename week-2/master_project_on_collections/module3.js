// ======================
// DATA SETUP
// ======================

const courses = [
  { id: 101, title: "JavaScript", price: 999, published: true },
  { id: 102, title: "React", price: 1499, published: false },
  { id: 103, title: "Node", price: 1299, published: true }
];

const cart = [
  { courseId: 101, qty: 1 },
  { courseId: 103, qty: 2 }
];

// ======================
// MODULE-3: SHOPPING CART ENGINE
// ======================

// 1. Merge cart with courses to get full course info
const getCartDetails = (cart, courses) =>
  cart.map(item => {
    const course = courses.find(c => c.id === item.courseId);
    return {
      ...item,
      title: course.title,
      price: course.price,
      subtotal: course.price * item.qty
    };
  });

// 2. Calculate total cart amount
const getCartTotal = (cart, courses) =>
  getCartDetails(cart, courses)
    .reduce((total, item) => total + item.subtotal, 0);

// 3. Increase quantity of a course (immutably)
const increaseCourseQty = (cart, courseId) =>
  cart.map(item =>
    item.courseId === courseId
      ? { ...item, qty: item.qty + 1 }
      : item
  );

// 4. Remove a course from cart
const removeCourseFromCart = (cart, courseId) =>
  cart.filter(item => item.courseId !== courseId);

// 5. Check if all cart items are paid courses
const areAllCoursesPaid = (cart, courses) =>
  cart.every(item => {
    const course = courses.find(c => c.id === item.courseId);
    return course.price > 0;
  });

// ======================
// TESTING / OUTPUT
// ======================

console.log("Cart Details:", getCartDetails(cart, courses));
console.log("Cart Total Amount:", getCartTotal(cart, courses));

const updatedCart = increaseCourseQty(cart, 101);
console.log("Updated Cart (Qty Increased):", updatedCart);

const cartAfterRemoval = removeCourseFromCart(cart, 103);
console.log("Cart After Removal:", cartAfterRemoval);

console.log("All Courses Paid:", areAllCoursesPaid(cart, courses));
