import { describe, expect, it } from "vitest";
import { calculateOrderTotal, describeOrder, type Order } from "../src/orderService.js";

describe("calculateOrderTotal", () => {
  it("calculates a standard US order", () => {
    const order: Order = {
      customerLevel: "standard",
      destination: "US",
      items: [{ name: "Mouse", price: 40, quantity: 2, category: "electronics" }]
    };

    expect(calculateOrderTotal(order)).toBe(88);
  });

  it("applies gold discount and free US shipping", () => {
    const order: Order = {
      customerLevel: "gold",
      destination: "US",
      items: [{ name: "Desk", price: 250, quantity: 1, category: "furniture" }]
    };

    expect(calculateOrderTotal(order)).toBe(200);
  });

  it("ignores items with a non-positive quantity", () => {
    const order: Order = {
      customerLevel: "standard",
      destination: "CA",
      items: [{ name: "Cable", price: 10, quantity: 0, category: "electronics" }]
    };

    expect(calculateOrderTotal(order)).toBe(12);
  });
});

describe("describeOrder", () => {
  it("formats an order summary", () => {
    const order: Order = {
      customerLevel: "silver",
      destination: "UK",
      items: [{ name: "Lamp", price: 30, quantity: 1, category: "home" }]
    };

    expect(describeOrder(order)).toContain("1 x Lamp @ $30");
  });
});