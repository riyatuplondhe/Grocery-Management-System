const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let products = [
    { id: 1, name: "Rice", category: "Grains", price: 60, stock: 25 },
    { id: 2, name: "Milk", category: "Dairy", price: 30, stock: 20 },
    { id: 3, name: "Bread", category: "Bakery", price: 40, stock: 15 },
    { id: 4, name: "Apple", category: "Fruits", price: 120, stock: 10 }
];

app.get("/api/products", (req, res) => {
    res.json(products);
});

app.post("/api/products", (req, res) => {
    const { name, category, price, stock } = req.body;

    if (!name || !category || price === undefined || stock === undefined) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const product = {
        id: products.length > 0
            ? products[products.length - 1].id + 1
            : 1,
        name,
        category,
        price: Number(price),
        stock: Number(stock)
    };

    products.push(product);
    res.status(201).json(product);
});

app.put("/api/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const { stock } = req.body;

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    product.stock = Number(stock);
    res.json(product);
});

app.delete("/api/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const deletedProduct = products.splice(index, 1);

    res.json({
        message: "Product deleted successfully",
        product: deletedProduct[0]
    });
});

app.get("/api/products/search/:name", (req, res) => {
    const searchName = req.params.name.toLowerCase();

    const result = products.filter(product =>
        product.name.toLowerCase().includes(searchName)
    );

    res.json(result);
});

app.get("/api/inventory/value", (req, res) => {
    const totalValue = products.reduce(
        (total, product) => total + product.price * product.stock,
        0
    );

    res.json({
        totalValue
    });
});

app.listen(PORT, () => {
    console.log(`Grocery Management System running at http://localhost:${PORT}`);
});