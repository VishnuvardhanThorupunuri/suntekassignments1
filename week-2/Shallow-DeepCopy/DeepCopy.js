// Given object
const order = {
  orderId: "ORD1001",
  customer: {
    name: "Anita",
    address: {
      city: "Hyderabad",
      pincode: 500085
    }
  },
  items: [
    { product: "Laptop", price: 70000 }
  ]
};

// ✅ Deep copy (Node.js compatible)
const orderCopy = JSON.parse(JSON.stringify(order));

// Modify copied object
orderCopy.customer.address.city = "Bangalore";
orderCopy.items[0].price = 65000;

// Verify result
console.log("Original Order:", order);
console.log("Copied Order:", orderCopy);
