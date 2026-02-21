// Class to store basic product info
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// Class to store a product and its specific quantity in the cart
class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  // Method to calculate the total price for this specific item
  calculateTotalPrice() {
    return this.product.price * this.quantity;
  }
}

// Class to manage the collection of items
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  // Get total price of all items in the cart
  getTotal() {
    return this.items.reduce((total, item) => total + item.calculateTotalPrice(), 0);
  }

  // Add an item: if product exists, increase quantity; otherwise, add new item
  addItem(product, quantity = 1) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new ShoppingCartItem(product, quantity));
    }
  }

  // Remove an item by product ID
  removeItem(productId) {
    this.items = this.items.filter(item => item.product.id !== productId);
  }

  // Display cart items in the console
  displayCart() {
    if (this.items.length === 0) {
      console.log("The cart is empty.");
      return;
    }
    console.log("--- Shopping Cart Contents ---");
    this.items.forEach(item => {
      console.log(`${item.product.name} | Qty: ${item.quantity} | Total: $${item.calculateTotalPrice()}`);
    });
    console.log(`Final Total: $${this.getTotal()}`);
    console.log("------------------------------");
  }
}





// Testing

// 1. Create Products
const apple = new Product(1, "Organic Apple", 1.50);
const bread = new Product(2, "Sourdough Bread", 4.00);
const milk = new Product(3, "Whole Milk", 3.25);

// 2. Create a Shopping Cart
const myCart = new ShoppingCart();

// 3. Add items to the cart
myCart.addItem(apple, 4); // 4 apples
myCart.addItem(bread, 1); // 1 bread
myCart.addItem(milk, 2);  // 2 milks

// 4. Display the cart
console.log("Initial Cart:");
myCart.displayCart();

// 5. Remove an item (the bread)
console.log("Removing Bread...");
myCart.removeItem(2);

// 6. Display the cart again to verify removal and new total
myCart.displayCart();