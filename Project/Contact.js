
/* =========================================
   BANANA BLISS - CONTACT JAVASCRIPT
   ========================================= */

// Banana Bliss Branches
const branches = [

{
   name: "Banana Bliss - Johor Bahru",
   address: "The Mall Mid Valley Southkey, Johor Bahru, Malaysia"
},

{
   name: "Banana Bliss - Kuala Lumpur",
   address: "The Exchange TRX, Kuala Lumpur, Malaysia"
},

{
   name: "Banana Bliss - Penang",
   address: "Jalan Penang, George Town, Penang, Malaysia"
}

];

/* =========================================
   CHANGE SELECTED BRANCH
   ========================================= */

function changeBranch(index) {
   let branch = branches[index];
   if (!branch) {
      return;
}

// Change Google Maps Location
let map = document.getElementById("storeMap");

map.src =
"https://www.google.com/maps?q=" +
encodeURIComponent(branch.address) +
"&z=17&output=embed";

// Display Selected Branch
document.getElementById("selectedBranch").textContent =
"Showing: " + branch.name;

// Highlight Selected Branch
let branchCards = document.querySelectorAll(".branch-card");

branchCards.forEach(function(card) {
   card.classList.remove("active");
});

branchCards[index].classList.add("active");

// Scroll to Google Maps
document.getElementById("storeMapSection").scrollIntoView({
   behavior: "smooth",
   block: "start"
});

}

/* =========================================
   CONTACT FORM VALIDATION
   ========================================= */

function submitContactForm(event) {
   event.preventDefault();

// Get Input Values
   let name = document.getElementById("contactName").value.trim();

   let email = document.getElementById("contactEmail").value.trim();

   let subject = document.getElementById("contactSubject").value;

   let message = document.getElementById("contactMessage").value.trim();

   let contactStatus = document.getElementById("contactStatus");

// Validate Customer Name
if (name.length < 2 || name.length > 50) {
   alert("Please enter a name between 2 and 50 characters.");
   return;
}

// Validate Email Address
let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {
   alert("Please enter a valid email address.");
   return;
}

// Validate Subject
if (subject === "") {
   alert("Please select a subject.");
   return;
}

// Validate Message
if (message.length < 10) {
   alert("Please write at least 10 characters in your message.");
   return;
}

// Display Confirmation Message
contactStatus.textContent ="Thank you, " + name + "! Your message has been recorded for this demo. No email has been sent.";

contactStatus.style.color = "#287A3E";

// Reset Contact Form
document.getElementById("contactForm").reset();

}

/* =========================================
   LOAD CONTACT PAGE
   ========================================= */

document.addEventListener("DOMContentLoaded", function() {

// Set Up Branch Selection
   let branchCards = document.querySelectorAll(".branch-card");
   branchCards.forEach(function(button) {
      button.addEventListener("click", function() {
         let branchIndex = Number(button.dataset.branch);
         changeBranch(branchIndex);
});

});

// Contact Form
let contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", submitContactForm);

// Reset Button
contactForm.addEventListener("reset", function() {
   document.getElementById("contactStatus").textContent = "";
});

// Set Default Branch
document.getElementById("selectedBranch").textContent ="Showing: " + branches[0].name;

});
