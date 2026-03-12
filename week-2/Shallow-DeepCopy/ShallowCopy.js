const user = {
  id: 101,
  name: "Ravi",
  preferences: {
    theme: "dark",
    language: "en"
  }
};

// 1. Create a shallow copy
const userCopy = { ...user };

// 2. Change values in copied object
// i. Change name
userCopy.name = "Amit";

// ii. Change preferences.theme
userCopy.preferences.theme = "light";

// iii. Log both objects
console.log("Original User:", user);
console.log("Copied User:", userCopy);
