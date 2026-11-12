
/* =========================================
   BANANA BLISS - SHOPPING CART JAVASCRIPT
   ========================================= */

// Delivery Settings
const DELIVERY_FEE = 6.00;
const MAX_DISTANCE = 12;

// Banana Bliss Branch Locations
// Approximate reference coordinates for the assignment
const storeLocations = {

jb: {
name: "Johor Bahru - Mid Valley Southkey",
lat: 1.5008,
lon: 103.7780
},

kl: {
name: "Kuala Lumpur - The Exchange TRX",
lat: 3.1426,
lon: 101.7180
},

penang: {
name: "Penang - Penang Road",
lat: 5.4181,
lon: 100.3314
}

};

// Delivery Check Status
let deliveryApproved = false;
let distanceCheckVersion = 0;

/* =========================================
   GET SHOPPING CART
   ========================================= */

function getCart() {

try {

let cart = JSON.parse(localStorage.getItem("bananaBlissCart")) || [];

return Array.isArray(cart) ? cart : [];

} catch (error) {

return [];

}

}

/* =========================================
   SAVE SHOPPING CART
   ========================================= */

function saveCart(cart) {

try {

localStorage.setItem("bananaBlissCart", JSON.stringify(cart));

return true;

} catch (error) {

alert("Unable to save your shopping cart.");

return false;

}

}

/* =========================================
   DISPLAY SHOPPING CART
   ========================================= */

function displayCart() {

let cart = getCart();

let cartItems = document.getElementById("cartItems");

cartItems.innerHTML = "";

// Display Message When Cart Is Empty
if (cart.length === 0) {

let emptyMessage = document.createElement("div");

emptyMessage.className = "empty-cart";

emptyMessage.textContent =
"Your shopping cart is empty. Explore our delicious banana desserts!";

cartItems.appendChild(emptyMessage);

}

// Display Each Product
cart.forEach(function(item, index) {

// Product Container
let cartItem = document.createElement("div");

cartItem.className = "cart-item";

// Product Image
let image = document.createElement("img");

image.src = item.image;
image.alt = item.name;

// Product Information
let info = document.createElement("div");

info.className = "cart-item-info";

// Product Name
let name = document.createElement("h3");

name.textContent = item.name;

// Product Price
let price = document.createElement("p");

price.textContent =
"Price: RM" + Number(item.price).toFixed(2);

// Add Product Information
info.appendChild(name);
info.appendChild(price);

// Display Selected Combo Desserts
if (Array.isArray(item.selectedItems) && item.selectedItems.length > 0) {

let comboTitle = document.createElement("p");

comboTitle.textContent = "Selected Desserts:";

comboTitle.style.fontWeight = "bold";

info.appendChild(comboTitle);

item.selectedItems.forEach(function(selectedItem) {

let selectedText = document.createElement("p");

selectedText.textContent = "• " + selectedItem;

selectedText.style.margin = "4px 0";

info.appendChild(selectedText);

});

}

// Quantity Controls
let quantityBox = document.createElement("div");

quantityBox.className = "cart-quantity";

// Decrease Quantity Button
let minusButton = document.createElement("button");

minusButton.type = "button";
minusButton.textContent = "−";

minusButton.setAttribute(
"aria-label",
"Decrease quantity of " + item.name
);

minusButton.addEventListener("click", function() {

changeQuantity(index, -1);

});

// Quantity Number
let quantity = document.createElement("span");

quantity.textContent = item.quantity;

// Increase Quantity Button
let plusButton = document.createElement("button");

plusButton.type = "button";
plusButton.textContent = "+";

plusButton.setAttribute(
"aria-label",
"Increase quantity of " + item.name
);

plusButton.addEventListener("click", function() {

changeQuantity(index, 1);

});

// Add Quantity Controls
quantityBox.appendChild(minusButton);
quantityBox.appendChild(quantity);
quantityBox.appendChild(plusButton);

info.appendChild(quantityBox);

// Product Total Price
let itemTotal = document.createElement("p");

itemTotal.className = "cart-item-total";

itemTotal.textContent =
"Total: RM" +
(Number(item.price) * Number(item.quantity)).toFixed(2);

info.appendChild(itemTotal);

// Remove Product Button
let removeButton = document.createElement("button");

removeButton.type = "button";
removeButton.className = "remove-btn";
removeButton.textContent = "Remove";

removeButton.addEventListener("click", function() {

removeItem(index);

});

info.appendChild(removeButton);

// Add Product to Cart Container
cartItem.appendChild(image);
cartItem.appendChild(info);

cartItems.appendChild(cartItem);

});

// Calculate Order Summary
calculateTotal();

// Disable Buttons When Cart Is Empty
document.getElementById("clearCartBtn").disabled =
cart.length === 0;

document.querySelector(".place-order-btn").disabled =
cart.length === 0;

}

/* =========================================
   CHANGE PRODUCT QUANTITY
   ========================================= */

function changeQuantity(index, change) {

let cart = getCart();

if (!cart[index]) {
return;
}

let currentQuantity = Number(cart[index].quantity);

let newQuantity = currentQuantity + change;

// Remove Item When Quantity Reaches Zero
if (newQuantity < 1) {

removeItem(index);

return;

}

// Maximum Quantity
if (newQuantity > 99) {

alert("Maximum quantity is 99 per item.");

return;

}

// Update Quantity
cart[index].quantity = newQuantity;

// Save Updated Cart
if (saveCart(cart)) {

displayCart();

}

}

/* =========================================
   REMOVE PRODUCT
   ========================================= */

function removeItem(index) {

let cart = getCart();

if (!cart[index]) {
return;
}

// Remove Product From Cart
cart.splice(index, 1);

// Save Updated Cart
if (saveCart(cart)) {

displayCart();

}

}

/* =========================================
   CLEAR SHOPPING CART
   ========================================= */

function clearCart() {

let cart = getCart();

if (cart.length === 0) {
return;
}

// Ask Customer Before Clearing
let confirmation = confirm(
"Are you sure you want to remove all products from your shopping cart?"
);

if (!confirmation) {
return;
}

// Clear All Cart Items
if (saveCart([])) {

displayCart();

document.getElementById("orderMessage").textContent = "";

}

}

/* =========================================
   CALCULATE TOTAL PAYMENT
   ========================================= */

function calculateTotal() {

let cart = getCart();

// Calculate Subtotal
let subtotal = 0;

cart.forEach(function(item) {

subtotal +=
Number(item.price) * Number(item.quantity);

});

// Get Selected Order Method
let method =
document.querySelector('input[name="orderMethod"]:checked').value;

// Calculate Delivery Fee
let deliveryFee = 0;

if (method === "delivery" && cart.length > 0) {

deliveryFee = DELIVERY_FEE;

}

// Calculate Final Payment
let totalPayment = subtotal + deliveryFee;

// Display Subtotal
document.getElementById("subtotal").textContent =
"RM" + subtotal.toFixed(2);

// Display Delivery Fee
document.getElementById("deliveryFee").textContent =
"RM" + deliveryFee.toFixed(2);

// Display Total Payment
document.getElementById("totalPayment").textContent =
"RM" + totalPayment.toFixed(2);

return totalPayment;

}

/* =========================================
   CHANGE PICKUP OR DELIVERY
   ========================================= */

function updateOrderMethod() {

let method =
document.querySelector('input[name="orderMethod"]:checked').value;

let addressGroup = document.getElementById("addressGroup");

let addressInput = document.getElementById("customerAddress");

// Show Delivery Address Only When Delivery Is Selected
if (method === "delivery") {

addressGroup.hidden = false;

addressInput.required = true;

} else {

addressGroup.hidden = true;

addressInput.required = false;

}

// Branch Is Required For Both Methods
document.getElementById("pickupBranch").required = true;

// Clear Old Distance Result
resetDistanceCheck();

// Update Total Payment
calculateTotal();

}

/* =========================================
   RESET DELIVERY DISTANCE
   ========================================= */

function resetDistanceCheck() {

deliveryApproved = false;

// Cancel Previous Pending Check Results
distanceCheckVersion++;

let distanceMessage = document.getElementById("distanceMessage");

if (distanceMessage) {

distanceMessage.textContent =
"Please check your delivery distance before placing an order.";

distanceMessage.className = "";

}

}

/* =========================================
   CALCULATE DISTANCE BETWEEN TWO POINTS
   ========================================= */

// Haversine Formula
function calculateDistance(lat1, lon1, lat2, lon2) {

const EARTH_RADIUS = 6371;

// Convert Latitude and Longitude to Radians
let dLat = (lat2 - lat1) * Math.PI / 180;

let dLon = (lon2 - lon1) * Math.PI / 180;

let a =
Math.sin(dLat / 2) * Math.sin(dLat / 2) +
Math.cos(lat1 * Math.PI / 180) *
Math.cos(lat2 * Math.PI / 180) *
Math.sin(dLon / 2) * Math.sin(dLon / 2);

let c =
2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

// Return Distance in KM
return EARTH_RADIUS * c;

}

/* =========================================
   CHECK DELIVERY DISTANCE
   ========================================= */

function checkDeliveryDistance() {

// Get Selected Branch
let branchId = document.getElementById("pickupBranch").value;

// Get Delivery Address
let address = document.getElementById("customerAddress").value.trim();

// Distance Message
let distanceMessage = document.getElementById("distanceMessage");

// Clear Previous Check
resetDistanceCheck();

let currentCheck = distanceCheckVersion;

// Validate Branch
if (!storeLocations[branchId]) {

distanceMessage.textContent =
"Please select a branch before checking delivery distance.";

distanceMessage.className = "distance-error";

return;

}

// Validate Delivery Address
if (address.length < 10) {

distanceMessage.textContent =
"Please enter your complete delivery address.";

distanceMessage.className = "distance-error";

return;

}

// Check Browser Geolocation Support
if (!navigator.geolocation) {

distanceMessage.textContent =
"Your browser does not support location checking.";

distanceMessage.className = "distance-error";

return;

}

// Show Checking Message
distanceMessage.textContent =
"Checking your current device location...";

// Request Customer Location
navigator.geolocation.getCurrentPosition(

function(position) {

// Ignore Old Results If Customer Changes Selection
if (currentCheck !== distanceCheckVersion) {
return;
}

// Make Sure Customer Still Selected Same Branch
if (document.getElementById("pickupBranch").value !== branchId) {
return;
}

// Make Sure Delivery Is Still Selected
let method =
document.querySelector('input[name="orderMethod"]:checked').value;

if (method !== "delivery") {
return;
}

// Get Branch Coordinates
let store = storeLocations[branchId];

// Get Customer Coordinates
let customerLat = position.coords.latitude;

let customerLon = position.coords.longitude;

// Calculate Distance
let distance = calculateDistance(
store.lat,
store.lon,
customerLat,
customerLon
);

// Within 12 KM
if (distance <= MAX_DISTANCE) {

deliveryApproved = true;

distanceMessage.textContent =
"Delivery Available! Your current device is approximately " +
distance.toFixed(2) +
" km from " +
store.name +
". Maximum distance: " +
MAX_DISTANCE +
" km.";

distanceMessage.className = "distance-success";

} else {

// More Than 12 KM
deliveryApproved = false;

distanceMessage.textContent =
"Sorry, your location is too far for delivery! " +
"Distance: " +
distance.toFixed(2) +
" km. Maximum allowed: " +
MAX_DISTANCE +
" km.";

distanceMessage.className = "distance-error";

}

},

function(error) {

if (currentCheck !== distanceCheckVersion) {
return;
}

deliveryApproved = false;

distanceMessage.textContent =
"Unable to check your location. Please allow location access and try again.";

distanceMessage.className = "distance-error";

},

{
enableHighAccuracy: true,
timeout: 15000,
maximumAge: 0
}

);

}

/* =========================================
   CHECKOUT VALIDATION
   ========================================= */

function placeOrder(event) {

event.preventDefault();

// Get Cart
let cart = getCart();

// Validate Shopping Cart
if (cart.length === 0) {

alert("Your shopping cart is empty!");

return;

}

// Get Customer Information
let name = document.getElementById("customerName").value.trim();

let phone = document.getElementById("customerPhone").value.trim();

let email = document.getElementById("customerEmail").value.trim();

let method =
document.querySelector('input[name="orderMethod"]:checked').value;

let branchId = document.getElementById("pickupBranch").value;

let address = document.getElementById("customerAddress").value.trim();

let orderNotes = document.getElementById("orderNotes").value.trim();

// Validate Name
if (name.length < 2 || name.length > 100) {

alert("Please enter your full name.");

return;

}

// Validate Phone Number
let phonePattern = /^[0-9+\-\s]{9,16}$/;

if (!phonePattern.test(phone)) {

alert("Please enter a valid phone number.");

return;

}

// Validate Email
let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {

alert("Please enter a valid email address.");

return;

}

// Validate Branch For Both Methods
if (!storeLocations[branchId]) {

alert("Please select a Banana Bliss branch.");

return;

}

// Validate Delivery Address
if (method === "delivery" && address.length < 10) {

alert("Please enter your complete delivery address.");

return;

}

// Check Delivery Distance
if (method === "delivery" && !deliveryApproved) {

alert(
"Delivery is not approved. Please check your delivery distance first."
);

return;

}

// Calculate Final Payment
let totalPayment = calculateTotal();

// Get Selected Branch Name
let branchName = storeLocations[branchId].name;

// Prepare Order Confirmation
let confirmation =
"BANANA BLISS - ORDER SUMMARY (DEMO)\n\n" +
"Customer: " + name + "\n" +
"Phone: " + phone + "\n" +
"Email: " + email + "\n" +
"Order Method: " +
(method === "pickup" ? "Self Pickup" : "Delivery") + "\n" +
"Branch: " + branchName + "\n";

if (method === "delivery") {

confirmation += "Delivery Address: " + address + "\n";

}

// Display Products
confirmation += "\nProducts:\n";

cart.forEach(function(item) {

confirmation +=
item.name + " x " + item.quantity +
" - RM" +
(Number(item.price) * Number(item.quantity)).toFixed(2) +
"\n";

// Include Selected Combo Desserts
if (Array.isArray(item.selectedItems)) {

item.selectedItems.forEach(function(selectedItem) {

confirmation += "  - " + selectedItem + "\n";

});

}

});

// Special Requests
if (orderNotes !== "") {

confirmation += "\nSpecial Requests: " + orderNotes + "\n";

}

// Total Payment
confirmation +=
"\nTotal Payment: RM" +
totalPayment.toFixed(2) +
"\n\nThis is a demonstration checkout. No real order has been submitted or paid.";

// Show Order Confirmation
let orderMessage = document.getElementById("orderMessage");

orderMessage.textContent = confirmation;

orderMessage.style.color = "#287A3E";

// Scroll to Confirmation Message
orderMessage.scrollIntoView({
behavior: "smooth",
block: "center"
});

}

/* =========================================
   LOAD SHOPPING CART PAGE
   ========================================= */

document.addEventListener("DOMContentLoaded", function() {

// Display Saved Products
displayCart();

// Set Initial Pickup / Delivery View
updateOrderMethod();

// Clear Cart Button
document.getElementById("clearCartBtn").addEventListener(
"click",
clearCart
);

// Pickup and Delivery Selection
document.querySelectorAll('input[name="orderMethod"]').forEach(function(radio) {

radio.addEventListener("change", updateOrderMethod);

});

// Branch Selection
document.getElementById("pickupBranch").addEventListener(
"change",
resetDistanceCheck
);

// Delivery Address Changes
document.getElementById("customerAddress").addEventListener(
"input",
resetDistanceCheck
);

// Check Delivery Distance Button
document.getElementById("checkDistanceBtn").addEventListener(
"click",
checkDeliveryDistance
);

// Checkout Form
document.getElementById("checkoutForm").addEventListener(
"submit",
placeOrder
);

});
