// ==========================================
// ITERATION 1: INITIAL MESSY CODE
// ==========================================

class MessyProduct {
  // Too many arguments, hard to tell what boolean means what
  constructor(name, price, category, isTaxable, hasFreeShipping, stock) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.isTaxable = isTaxable;
    this.hasFreeShipping = hasFreeShipping;
    this.stock = stock;
  }
}

class MessyShoppingCart {
  constructor() {
    this.items = [];
    this.subscribers = []; // Hardcoded user notifications mixed into cart logic
  }

  addItem(product, quantity) {
    this.items.push({ product, quantity });
  }

  // Code Smell: Monolithic method doing printing, calculations, and mutations
  checkout(discountType) {
    let total = 0;
    
    for (let item of this.items) {
      let itemPrice = item.product.price * item.quantity;
      total += itemPrice;
    }

    // Code Smell: Rigid conditional logic for business rules (Discounts)
    if (discountType === "BLACK_FRIDAY") {
      total = total * 0.8;
    } else if (discountType === "CHRISTMAS") {
      total = total * 0.9;
    } else if (discountType === "FLAT_10") {
      total = total - 10;
    }

    console.log(`Final Total: ${total} TND`);
    return total;
  }

  // Code Smell: Tight coupling of pricing notifications directly inside the cart
  notifyPriceDrop(product, newPrice) {
    console.log(`[ALERT] ${product.name} dropped to ${newPrice} TND! Notifying users...`);
  }
}