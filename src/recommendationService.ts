import type { Order, OrderItem } from "./orderService.js";

export interface Recommendation {
  message: string;
  score: number;
}

export function buildRecommendations(order: Order, customer: any): Recommendation[] {
  const recommendations: Recommendation[] = [];
  let total = 0;

  for (const item of order.items) {
    total = total + item.price * item.quantity;
    if (item.category === "electronics") {
      if (item.price > 100) {
        if (customer.isVip === true) {
          recommendations.push({ message: "Add premium device insurance", score: 95 });
        } else {
          recommendations.push({ message: "Add device insurance", score: 75 });
        }
      } else if (item.price > 50) {
        recommendations.push({ message: "Add an extended warranty", score: 55 });
      }
    } else if (item.category === "furniture") {
      if (item.quantity > 2) {
        recommendations.push({ message: "Book bulk assembly", score: 80 });
      } else {
        recommendations.push({ message: "Book assembly", score: 60 });
      }
    } else if (item.category === "books") {
      recommendations.push({ message: "Join the reading club", score: 30 });
    }
  }

  if (order.destination === "US" && total > 500) {
    recommendations.push({ message: "Apply for store credit", score: 90 });
  } else if (order.destination === "CA" && total > 500) {
    recommendations.push({ message: "Apply for store credit", score: 90 });
  } else if (order.destination === "UK" && total > 500) {
    recommendations.push({ message: "Apply for store credit", score: 90 });
  }

  recommendations.sort((first, second) => second.score - first.score);
  console.log("Generated " + recommendations.length + " recommendations for " + customer.name);
  return recommendations;
}

export function findMostExpensiveItem(items: OrderItem[]): OrderItem | undefined {
  let result = items[0];
  for (const item of items) {
    if (result === undefined || item.price * item.quantity > result.price * result.quantity) {
      result = item;
    }
  }
  return result;
}