const assert = require("assert");

function calculateTotalValue(products) {

    return products.reduce(
        (total, product) =>
            total + product.price * product.stock,
        0
    );

}


// Test 1
const products = [
    {
        name: "Rice",
        price: 60,
        stock: 10
    },
    {
        name: "Milk",
        price: 30,
        stock: 5
    }
];

const result =
    calculateTotalValue(products);

assert.strictEqual(
    result,
    750,
    "Inventory calculation test failed"
);


// Test 2
assert.strictEqual(
    products.length,
    2,
    "Product count test failed"
);


// Test 3
assert.strictEqual(
    products[0].name,
    "Rice",
    "Product name test failed"
);


console.log("Test 1: Inventory calculation - PASSED");
console.log("Test 2: Product count - PASSED");
console.log("Test 3: Product name - PASSED");

console.log("All tests passed successfully!");