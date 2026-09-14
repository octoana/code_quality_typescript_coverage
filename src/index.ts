import { calculateOrderTotal, describeOrder, type Order } from "./orderService.js";

const sampleOrder: Order = {
  customerLevel: "silver",
  destination: "US",
  couponCode: "SAVE10",
  items: [
    { name: "Keyboard", price: 80, quantity: 1, category: "electronics" },
    { name: "Monitor", price: 240, quantity: 2, category: "electronics" }
  ]
};

console.log(describeOrder(sampleOrder));
console.log(`Total: $${calculateOrderTotal(sampleOrder)}`);