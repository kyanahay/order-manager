// Coding Challenge 03b — Order Fulfillment Manager



// Model the Inventory
let inventory = [
  { sku: "SKU-001", name: "Eco Bottle", price: 19.99, stock: 42 },
  { sku: "SKU-002", name: "Desk Organizer", price: 14.50, stock: 6 },
  { sku: "SKU-003", name: "Wireless Mouse", price: 29.99, stock: 12 },
  { sku: "SKU-004", name: "Notebook Set", price: 9.99, stock: 4 }
];

console.log("=== Initial Inventory ===");
inventory.forEach((p) => {
  console.log(`${p.sku} | ${p.name} | $${p.price.toFixed(2)} | Stock: ${p.stock}`);
});



// Manage Inventory Changes
console.log("\n=== Inventory Changes ===");

// Add a new product
inventory.push({ sku: "SKU-005", name: "USB-C Cable", price: 7.99, stock: 25 });
console.log("Added product:", inventory[inventory.length - 1]);

// Remove the last product and log which item was removed
const removed = inventory.pop();
console.log("Removed product:", removed);

// Update price of one product (sale)
inventory[0].price = 16.99; // Eco Bottle on sale
console.log(`Sale applied: ${inventory[0].sku} new price = $${inventory[0].price.toFixed(2)}`);

// Update stock of another product (restock)
inventory[3].stock += 10; // restock Notebook Set (SKU-004)
console.log(`Restock: ${inventory[3].sku} new stock = ${inventory[3].stock}`);




// Create and Process Orders
let orders = [
  {
    orderId: "ORD-1001",
    items: [
      { sku: "SKU-001", qty: 2 },
      { sku: "SKU-004", qty: 3 }
    ]
  },
  {
    orderId: "ORD-1002",
    items: [
      { sku: "SKU-002", qty: 8 }, // This will cause a stock issue
      { sku: "SKU-003", qty: 1 }
    ]
  }
];

// Validate stock for all items first
function findProductBySku(sku) {
  return inventory.find((p) => p.sku === sku) || null;
}

function processOrder(order) {
  for (const item of order.items) {
    const product = findProductBySku(item.sku);

    if (product.stock < item.qty) {
      const shortBy = item.qty - product.stock;
      return `Order ${order.orderId} failed: ${product.name} (${item.sku}) is short by ${shortBy} unit(s).`;
    }
  }

  // If all good, decrement stock and calculate total
  let total = 0;

  for (const item of order.items) {
    const product = findProductBySku(item.sku);

    product.stock -= item.qty;
    total += product.price * item.qty;
  }

  return `Order ${order.orderId} processed. Total = $${total.toFixed(2)}`;
}

console.log("\n=== Order Processing ===");
orders.forEach((order) => {
  console.log(processOrder(order));
});

console.log("\n=== Inventory After Orders ===");
inventory.forEach((p) => {
  console.log(`${p.sku} | ${p.name} | $${p.price.toFixed(2)} | Stock: ${p.stock}`);
});




//  Reporting & Insights
console.log("\n=== Reporting & Insights ===");

// Total inventory value using reduce
const totalInventoryValue = inventory.reduce((sum, p) => sum + p.price * p.stock, 0);
console.log(`Total Inventory Value: $${totalInventoryValue.toFixed(2)}`);

// Low-stock items using filter
const lowStockItems = inventory.filter((p) => p.stock <= 5);
console.log("Low-stock items (stock <= 5):");
if (lowStockItems.length === 0) {
  console.log("None");
} else {
  lowStockItems.forEach((p) => console.log(`${p.sku} | ${p.name} | Stock: ${p.stock}`));
}

// Price list using map
const priceList = inventory.map((p) => `${p.sku} — $${p.price.toFixed(2)}`);
console.log("Price List:", priceList);