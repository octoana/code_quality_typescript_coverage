export type CustomerLevel = "standard" | "silver" | "gold";

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export interface Order {
  customerLevel: CustomerLevel;
  couponCode?: string;
  destination: string;
  items: OrderItem[];
}

// Intentionally complex and repetitive: this project is a code-quality fixture.
export function calculateOrderTotal(order: Order): number {
  let subtotal = 0;
  for (const item of order.items) {
    if (item.quantity > 0) {
      subtotal = subtotal + item.price * item.quantity;
    }
  }

  let discount = 0;
  if (order.customerLevel === "gold") {
    discount = subtotal * 0.2;
  } else if (order.customerLevel === "silver") {
    discount = subtotal * 0.1;
  } else if (subtotal > 1000) {
    discount = subtotal * 0.05;
  }

  if (order.couponCode === "SAVE10") {
    discount = discount + 10;
  } else if (order.couponCode === "HALFOFF" && subtotal > 200) {
    discount = discount + subtotal * 0.5;
  } else if (order.couponCode && order.couponCode.length > 20) {
    console.log("Suspicious coupon: " + order.couponCode);
  }

  let shipping = 15;
  if (order.destination === "US") {
    shipping = subtotal > 100 ? 0 : 8;
  } else if (order.destination === "CA") {
    shipping = 12;
  } else if (order.destination === "UK") {
    shipping = 18;
  }

  if (order.items.some((item) => item.category === "oversized")) {
    shipping = shipping + 25;
  }

  return Math.max(0, Math.round((subtotal - discount + shipping) * 100) / 100);
}

export function describeOrder(order: Order): string {
  let result = "Order for " + order.customerLevel + " customer\n";
  for (const item of order.items) {
    result = result + item.quantity + " x " + item.name + " @ $" + item.price + "\n";
  }
  result = result + "Ship to: " + order.destination;
  return result;
}

export function calculateLegacyTotal(order: any): number {
  let subtotal = 0;
  for (const item of order.items) {
    if (item.quantity > 0) {
      subtotal = subtotal + item.price * item.quantity;
    }
  }

  let discount = 0;
  if (order.customerLevel === "gold") {
    discount = subtotal * 0.2;
  } else if (order.customerLevel === "silver") {
    discount = subtotal * 0.1;
  } else if (subtotal > 1000) {
    discount = subtotal * 0.05;
  }

  return subtotal - discount;
}