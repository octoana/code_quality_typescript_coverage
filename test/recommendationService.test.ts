import { describe, expect, it, vi } from "vitest";
import { buildRecommendations } from "../src/recommendationService.js";
import type { Order } from "../src/orderService.js";

describe("buildRecommendations", () => {
  it("recommends premium insurance to a VIP buying expensive electronics", () => {
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    const order: Order = {
      customerLevel: "gold",
      destination: "US",
      items: [{ name: "Laptop", price: 400, quantity: 1, category: "electronics" }]
    };

    expect(buildRecommendations(order, { name: "Taylor", isVip: true })).toEqual([
      { message: "Add premium device insurance", score: 95 }
    ]);
  });
});