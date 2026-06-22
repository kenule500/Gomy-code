// ==========================================
// ITERATION 3: BUILDER PATTERN FOR PRODUCTS
// ==========================================

class Product {
  constructor(builder) {
    this.name = builder.name;
    this.price = builder.price;
    this.category = builder.category;
    this.isTaxable = builder.isTaxable || false;
    this.hasFreeShipping = builder.hasFreeShipping || false;
    this.stock = builder.stock || 0;
  }
}

class ProductBuilder {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  setCategory(category) {
    this.category = category;
    return this; // Return 'this' to allow method chaining
  }

  setTaxable(isTaxable) {
    this.isTaxable = isTaxable;
    return this;
  }

  setFreeShipping(hasFreeShipping) {
    this.hasFreeShipping = hasFreeShipping;
    return this;
  }

  setStock(stock) {
    this.stock = stock;
    return this;
  }

  build() {
    return new Product(this);
  }
}