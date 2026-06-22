// ==========================================
// ITERATION 4: STRATEGY PATTERN FOR DISCOUNTS
// ==========================================

// Abstract Strategy base behaviors
class DiscountStrategy {
  calculate(amount) { return amount; }
}

class NoDiscount extends DiscountStrategy {
  calculate(amount) { return amount; }
}

class PercentageDiscount extends DiscountStrategy {
  constructor(percentage) {
    super();
    this.percentage = percentage;
  }
  calculate(amount) {
    return amount * (1 - this.percentage / 100);
  }
}

class FlatDiscount extends DiscountStrategy {
  constructor(discountAmount) {
    super();
    this.discountAmount = discountAmount;
  }
  calculate(amount) {
    return Math.max(0, amount - this.discountAmount);
  }
}