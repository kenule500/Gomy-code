const ShoppingCart = (function () {
  // Private variable encapsulated within the closure scope
  let items = [];

  // Public API exposed to the application
  return {
    addItem: function (name, quantity, price) {
      items.push({ name, quantity, price });
    },

    viewCart: function () {
      if (items.length === 0) {
        console.log("The cart is empty.");
        return;
      }

      let total = 0;
      items.forEach(item => {
        const itemTotal = item.quantity * item.price;
        total += itemTotal;
        console.log(`${item.name} (x${item.quantity}) - ${itemTotal.toFixed(2)} TND`);
      });

      console.log(`Total: ${total.toFixed(2)} TND`);
    },

    removeItem: function (name) {
      items = items.filter(item => item.name.toLowerCase() !== name.toLowerCase());
    },

    clearCart: function () {
      items = [];
    }
  };
})();

// --- Verification Logs ---
ShoppingCart.addItem("Apple", 2, 1.5);
ShoppingCart.addItem("Orange", 3, 2.0);
ShoppingCart.viewCart();

ShoppingCart.removeItem("Apple");
ShoppingCart.viewCart();