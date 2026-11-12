
// Banana Bliss Menu Products
const products = [
{id:1,name:"Banana Brownie",price:14.90,category:"bakery",image:"images/bananabroniew.jpg"},
{id:2,name:"Banana Cream Cake",price:16.90,category:"bakery",image:"images/bananacake.jpg"},
{id:3,name:"Banana Cookie",price:7.90,category:"bakery",image:"images/bananacookie.jpg"},
{id:4,name:"Banana Muffin",price:8.90,category:"bakery",image:"images/bananamuffin.jpg"},
{id:5,name:"Banana Pie",price:14.90,category:"bakery",image:"images/bananapie.jpg"},
{id:6,name:"Baked Banana Cake",price:13.90,category:"bakery",image:"images/bananacake(baked).jpg"},
{id:7,name:"Banana Cheesecake",price:16.90,category:"bakery",image:"images/bananacheesecake.jpg"},
{id:8,name:"Banana Walnut Cake",price:16.90,category:"bakery",image:"images/bananawalnutcake.jpg"},
{id:9,name:"Caramel Banana Cake",price:16.90,category:"bakery",image:"images/caramelbananacake.jpg"},
{id:10,name:"Chocolate Banana Cake",price:16.90,category:"bakery",image:"images/chocolatebananacake.jpg"},
{id:11,name:"Banana Ice Cream",price:12.90,category:"ice-cream",image:"images/bananaicecream.jpg"},
{id:12,name:"Banana Split",price:15.90,category:"ice-cream",image:"images/bananasplit.jpg"},
{id:13,name:"Banana Milk",price:10.90,category:"drinks",image:"images/bananamilk.jpg"},
{id:14,name:"Banana Milkshake",price:13.90,category:"drinks",image:"images/bananamilkshake.jpg"},
{id:15,name:"Banana Latte",price:12.90,category:"drinks",image:"images/bananalatte.jpg"},
{id:16,name:"Chocolate Banana Milkshake",price:14.90,category:"drinks",image:"images/chocobananashake.jpg"},
{id:17,name:"Banana Greek Yogurt",price:13.90,category:"pudding-yogurt",image:"images/bananagreekyogurt.jpg"},
{id:18,name:"Banana Pudding",price:11.90,category:"pudding-yogurt",image:"images/bananapudding.jpg"},
{id:19,name:"Banana Yogurt Bowl",price:13.90,category:"pudding-yogurt",image:"images/bananayogurtbowl.jpg"},
{id:20,name:"Banana Crepe",price:15.90,category:"bakery",image:"images/bananacrepe.jpg"},
{id:21,name:"Combo 1: Cake + Drink",price:21.90,category:"combo",image:"images/combo1.png"},
{id:22,name:"Combo 2: Cake + Ice Cream",price:23.90,category:"combo",image:"images/combo2.png"},
{id:23,name:"Combo 3: Cake + Yogurt or Pudding",price:22.90,category:"combo",image:"images/combo3.png"},
{id:24,name:"Combo 4: Two Slices of Cake",price:24.90,category:"combo",image:"images/combo4.png"}
];

// Combo Choices
const cakeChoices = [
"Banana Brownie",
"Banana Cream Cake",
"Banana Muffin",
"Baked Banana Cake",
"Banana Chocolate Cake",
"Banana Caramel Cake",
"Banana Walnut",
];

const drinkChoices = [
"Banana Milk",
"Banana Milkshake",
"Banana Latte",
"Chocolate Banana Milkshake"
];

const iceCreamChoices = [
"Banana Ice Cream",
"Banana Split"
];

const dessertChoices = [
"Banana Greek Yogurt",
"Banana Pudding",
"Banana Yogurt Bowl"
];

// Load Shopping Cart
function getCart() {

try {
let cart = JSON.parse(localStorage.getItem("bananaBlissCart")) || [];
return Array.isArray(cart) ? cart : [];
} catch (error) {
return [];
 }
}

// Save Shopping Cart
function saveCart(cart) {

try {
localStorage.setItem("bananaBlissCart", JSON.stringify(cart));
return true;
} catch (error) {
alert("Unable to save your shopping cart.");
return false;
 }
}

// Update Floating Cart Number
function updateCartCount() {
let cartCount = document.getElementById("cartCount");
if (!cartCount) {
return;
}
let cart = getCart();
let totalQuantity = cart.reduce(function(total, item) {
return total + Number(item.quantity || 0);
}, 0);
cartCount.textContent = totalQuantity;
}

// Create Combo Dropdown
function createComboSelect(labelText, choices) {
let wrapper = document.createElement("div");
wrapper.className = "combo-options";

let label = document.createElement("label");
label.textContent = labelText;

let select = document.createElement("select");
select.className = "combo-select";
select.setAttribute("aria-label", labelText);
select.required = true;

let defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.textContent = "-- Select an Item --";
select.appendChild(defaultOption);

choices.forEach(function(choice) {

let option = document.createElement("option");
option.value = choice;
option.textContent = choice;

select.appendChild(option);

});

wrapper.appendChild(label);
wrapper.appendChild(select);

return wrapper;

}

// Display All Menu Products
function displayProducts(category = "all") {
let productList = document.getElementById("productList");
if (!productList) {
return;
}
productList.innerHTML = "";
let filteredProducts = products.filter(function(product) {
if (category === "all") {
return true;
}
return product.category === category;
});

filteredProducts.forEach(function(product) {

// Product Card
let card = document.createElement("div");
card.className = "menu-product-card";

// Product Image
let image = document.createElement("img");
image.src = product.image;
image.alt = product.name;
image.loading = "lazy";

// Product Name
let name = document.createElement("h3");
name.textContent = product.name;

// Product Price
let price = document.createElement("p");
price.className = "product-price";
price.textContent = "RM" + product.price.toFixed(2);

// Product Quantity
let quantityLabel = document.createElement("label");
quantityLabel.textContent = "Quantity: ";

let quantity = document.createElement("input");
quantity.type = "number";
quantity.min = "1";
quantity.max = "99";
quantity.step = "1";
quantity.value = "1";
quantity.style.width = "70px";
quantity.style.padding = "8px";
quantity.style.margin = "12px";
quantity.setAttribute("aria-label", "Quantity of " + product.name);

// Add to Cart Button
let addButton = document.createElement("button");
addButton.type = "button";
addButton.className = "btn";
addButton.textContent = "Add to Cart";

card.appendChild(image);
card.appendChild(name);
card.appendChild(price);

let comboSelects = [];

// Combo 1: Cake + Drink
if (product.id === 21) {

comboSelects.push(createComboSelect("Choose Your Cake", cakeChoices));
comboSelects.push(createComboSelect("Choose Your Drink", drinkChoices));

}

// Combo 2: Cake + Ice Cream
if (product.id === 22) {

comboSelects.push(createComboSelect("Choose Your Cake", cakeChoices));
comboSelects.push(createComboSelect("Choose Your Ice Cream", iceCreamChoices));

}

// Combo 3: Cake + Yogurt or Pudding
if (product.id === 23) {

comboSelects.push(createComboSelect("Choose Your Cake", cakeChoices));
comboSelects.push(createComboSelect("Choose Your Yogurt or Pudding", dessertChoices));

}

// Combo 4: Two Slices of Cake
if (product.id === 24) {

comboSelects.push(createComboSelect("Choose Your First Cake", cakeChoices));
comboSelects.push(createComboSelect("Choose Your Second Cake", cakeChoices));

}

// Add Combo Dropdowns to Card
comboSelects.forEach(function(wrapper) {
card.appendChild(wrapper);
});

card.appendChild(quantityLabel);
card.appendChild(quantity);
card.appendChild(addButton);

productList.appendChild(card);

// Add Product to Shopping Cart
addButton.addEventListener("click", function() {

let amount = Number(quantity.value);

if (!Number.isInteger(amount) || amount < 1 || amount > 99) {

alert("Please enter a quantity between 1 and 99.");

return;

}

let selectedItems = [];

for (let wrapper of comboSelects) {

let select = wrapper.querySelector("select");

if (select.value === "") {

alert("Please select all combo items before adding to cart.");

select.focus();

return;

}

selectedItems.push(select.value);

}

addToCart(product, amount, selectedItems);

});

});

}

// Add Product to Cart
function addToCart(product, amount, selectedItems) {

let cart = getCart();

// Unique Identifier for Each Combo Combination
let cartId = JSON.stringify([product.id, ...selectedItems]);

let existingItem = cart.find(function(item) {
return item.cartId === cartId;
});

if (existingItem) {

if (Number(existingItem.quantity) + amount > 99) {

alert("Maximum quantity is 99 per item.");

return;

}

existingItem.quantity = Number(existingItem.quantity) + amount;

} else {

let newItem = {
id: product.id,
cartId: cartId,
name: product.name,
price: product.price,
image: product.image,
quantity: amount,
selectedItems: selectedItems
};

cart.push(newItem);

}

if (!saveCart(cart)) {
return;
}

updateCartCount();

let cartMessage = document.getElementById("cartMessage");

if (cartMessage) {

cartMessage.textContent =
product.name + " has been added to your shopping cart!";

}

alert(product.name + " added to cart successfully!");

}

// Filter Menu Categories
function filterMenu(category) {

displayProducts(category);

document.querySelectorAll("[data-category]").forEach(function(button) {

button.classList.toggle(
"active",
button.dataset.category === category
);

});

}

// Load Menu Page
document.addEventListener("DOMContentLoaded", function() {

let categoryButtons = document.querySelectorAll("[data-category]");

categoryButtons.forEach(function(button) {

button.addEventListener("click", function() {

filterMenu(button.dataset.category);

});

});

// Check Category from Home Page Link
let params = new URLSearchParams(window.location.search);

let category = params.get("category") || "all";

let validCategories = [
"all",
"bakery",
"ice-cream",
"drinks",
"pudding-yogurt",
"combo",
];

if (!validCategories.includes(category)) {
category = "all";
}

filterMenu(category);

updateCartCount();

});
