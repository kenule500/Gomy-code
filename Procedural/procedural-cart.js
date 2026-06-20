// Global variable to store the cart data
let cart = [];

// Function to add items to the cart
function addItem(name, quantity, price) {
  cart.push({ name, quantity, price });
}

// Function to view all items and compute the total price
function viewCart() {
  if (cart.length === 0) {
    console.log("The cart is empty.");
    return;
  }

  let total = 0;
  cart.forEach(item => {
    const itemTotal = item.quantity * item.price;
    total += itemTotal;
    console.log(`${item.name} (x${item.quantity}) - ${itemTotal.toFixed(2)} TND`);
  });
  
  console.log(`Total: ${total.toFixed(2)} TND`);
}

// Function to remove an item from the cart by name
function removeItem(name) {
  cart = cart.filter(item => item.name.toLowerCase() !== name.toLowerCase());
}

// Function to clear all items from the cart
function clearCart() {
  cart = [];
}

// --- Verification Logs ---
addItem("Apple", 2, 1.5);
addItem("Orange", 3, 2.0);
viewCart(); 

removeItem("Apple");
viewCart();