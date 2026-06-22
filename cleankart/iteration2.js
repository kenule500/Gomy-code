// ==========================================
// ITERATION 2: CLEAN METHOD EXTRACTION
// ==========================================

class Product {
  constructor(name, price, category, isTaxable, hasFreeShipping, stock) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.isTaxable = isTaxable;
    this.hasFreeShipping = hasFreeShipping;
    this.stock = stock;
  }

  updatePrice(newPrice) {
    this.price = newPrice;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity) {
    this.items.push({ product, quantity });
  }

  calculateSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  // Extracted conditional logic out into its own dedicated method
  applyDiscount(subtotal, discountType) {
    switch (discountType) {
      case "BLACK_FRIDAY": return subtotal * 0.8;
      case "CHRISTMAS":    return subtotal * 0.9;
      case "FLAT_10":      return subtotal - 10;
      default:             return subtotal;
    }
  }

  calculateTotal(discountType) {
    const subtotal = this.calculateSubtotal();
    return this.applyDiscount(subtotal, discountType);
  }
}