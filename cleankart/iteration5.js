// ==========================================
// ITERATION 5: OBSERVER PATTERN & FINAL RUNNABLE APP
// ==========================================

// --- Observer Infrastructure ---
class UserObserver {
  constructor(username) {
    this.username = username;
  }
  update(productName, newPrice) {
    console.log(`[Notification for ${this.username}]: ${productName} drop alert! New price: ${newPrice} TND`);
  }
}

// --- Enhanced Product Subject ---
class ObservableProduct {
  constructor(builder) {
    this.name = builder.name;
    this.price = builder.price;
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  setPrice(newPrice) {
    if (newPrice < this.price) {
      this.notifyObservers(newPrice);
    }
    this.price = newPrice;
  }

  notifyObservers(newPrice) {
    this.observers.forEach(observer => observer.update(this.name, newPrice));
  }
}

// --- Unified Shopping Cart Engine ---
class ProductionShoppingCart {
  constructor() {
    this.items = [];
    this.discountStrategy = new NoDiscount(); // Default fallback strategy
  }

  setDiscountStrategy(strategy) {
    this.discountStrategy = strategy;
  }

  addItem(product, quantity) {
    this.items.push({ product, quantity });
  }

  calculateSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  calculateTotal() {
    const subtotal = this.calculateSubtotal();
    return this.discountStrategy.calculate(subtotal);
  }
}

// ==========================================
// VERIFICATION RUNNABLE EXAMPLES
// ==========================================

// 1. Using Builder to instantiate a complex product safely
const premiumLaptop = new ProductBuilder("MacBook Pro", 4500)
  .setCategory("Electronics")
  .setTaxable(true)
  .setFreeShipping(true)
  .setStock(14)
  .build();

// Convert item to an observable product entity for notifications
const trackableLaptop = new ObservableProduct({ name: premiumLaptop.name, price: premiumLaptop.price });

// 2. Set up observers
const customerA = new UserObserver("Alice");
const customerB = new UserObserver("Bob");
trackableLaptop.addObserver(customerA);
trackableLaptop.addObserver(customerB);

// 3. Orchestrate Cart & Strategies
const cart = new ProductionShoppingCart();
cart.addItem(trackableLaptop, 1);

console.log(`Standard Subtotal: ${cart.calculateSubtotal()} TND`);

// Apply a dynamic 20% Black Friday Discount strategy
cart.setDiscountStrategy(new PercentageDiscount(20));
console.log(`With Black Friday Strategy: ${cart.calculateTotal()} TND`);

// Apply a flat 150 TND coupon discount strategy instead
cart.setDiscountStrategy(new FlatDiscount(150));
console.log(`With Flat Coupon Strategy: ${cart.calculateTotal()} TND`);

// 4. Trigger the Observer alert via an independent price modification
trackableLaptop.setPrice(3999);