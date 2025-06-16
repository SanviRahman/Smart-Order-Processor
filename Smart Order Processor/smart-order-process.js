"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var menu = {
    "burger": { price: 5 },
    "pizza": { price: 8 },
    "salad": { price: 4 },
    "pasta": { price: 7 },
    "soda": { price: 2 }
};
console.log("Menu:");
var i = 1;
for (var item in menu) {
    console.log("".concat(i, ". ").concat(item, ": Price:").concat(menu[item].price));
    i++;
}
var readLine = readline.createInterface;
