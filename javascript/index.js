const Category = {
  ELECTRONICS: "electronics",
  CLOTHING: "clothing",
};

const products = [
  { id: 1, name: "phone", price: 900, category: Category.ELECTRONICS, stock: 10 },
  { id: 2, name: "headphones", price: 150, category: Category.ELECTRONICS, stock: 20 },
  { id: 3, name: "laptop", price: 1200, category: Category.ELECTRONICS, stock: 5 },
  { id: 4, name: "shirt", price: 40, category: Category.CLOTHING, stock: 30 },
];

let cart = []
let belowPrice = []



function filterProducts(products, category, maxPrice) {
  return products.filter(
    p => p.category === category && p.price <= maxPrice
  );
}


function addToCart(cart, product, quantity) {
  if (quantity > product.stock) {
    throw new Error("Insufficient stock");
  }

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    if (existing.quantity + quantity > product.stock) {
      throw new Error("Stock limit exceeded");
    }
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity
    });
  }

  return cart;
}


function removeFromCart(cart, productId) {
  return cart.filter(item => item.id !== productId);
}


function updateQuantity(cart, productId, quantity, stock) {
  return cart.map(item => {
    if (item.id === productId) {
      if (quantity > stock) {
        throw new Error("Insufficient stock");
      }
      return { ...item, quantity };
    }
    return item;
  });
}



function calculateTotal(cart) {
  return cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

function checkout(cart) {
  return {
    items: cart,
    totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: calculateTotal(cart)
  };
}


// 1. Filter electronics under $1000
const filtered = filterProducts(products, Category.ELECTRONICS, 1000);

// 2. Add phone x2
addToCart(cart, products[0], 2);

// 3. Add headphones x1
addToCart(cart, products[1], 1);

// 4. Update phone quantity to 3
cart = updateQuantity(cart, 1, 3, products[0].stock);

// 5. Remove headphones
cart = removeFromCart(cart, 2);

// 6. Checkout
const summary = checkout(cart);

console.log(summary);

