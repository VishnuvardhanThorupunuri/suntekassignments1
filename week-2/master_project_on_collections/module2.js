// ======================
// DATA SETUP
// ======================

const courses = [
  { id: 101, title: "JavaScript", price: 999, published: true },
  { id: 102, title: "React", price: 1499, published: false },
  { id: 103, title: "Node", price: 1299, published: true }
];

// ======================
// MODULE-2: COURSE CATALOG ENGINE
// ======================

// 1. Get only published courses
const getPublishedCourses = (courses) =>
  courses.filter(course => course.published);

// 2. Sort courses by price (high → low)
const sortCoursesByPriceDesc = (courses) =>
  [...courses].sort((a, b) => b.price - a.price);

// 3. Extract { title, price } only
const getCourseTitlesAndPrices = (courses) =>
  courses.map(({ title, price }) => ({ title, price }));

// 4. Calculate total value of published courses
const getTotalPublishedCourseValue = (courses) =>
  courses
    .filter(course => course.published)
    .reduce((total, course) => total + course.price, 0);

// 5. Add a new course immutably
const addCourse = (courses, newCourse) =>
  [...courses, newCourse];

// ======================
// TESTING / OUTPUT
// ======================

console.log("Published Courses:", getPublishedCourses(courses));
console.log("Courses Sorted by Price (High → Low):", sortCoursesByPriceDesc(courses));
console.log("Course Titles & Prices:", getCourseTitlesAndPrices(courses));
console.log("Total Value of Published Courses:", getTotalPublishedCourseValue(courses));

const newCourse = { id: 104, title: "TypeScript", price: 1599, published: true };
const updatedCourses = addCourse(courses, newCourse);

console.log("Original Courses:", courses);
console.log("Updated Courses:", updatedCourses);
