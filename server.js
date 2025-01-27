const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static("public"));

// Sample products data (would be fetched from a real database)
const products = [
  { id: 1, name: "Product 1", price: 100, description: "This is product 1" },
  { id: 2, name: "Product 2", price: 200, description: "This is product 2" },
  { id: 3, name: "Product 3", price: 300, description: "This is product 3" },
];

// Route to get product listings
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Route to process an order (just logs to console for now)
app.post("/api/order", (req, res) => {
  const order = req.body;
  console.log("Order received:", order);
  res.json({ message: "Order processed successfully!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
