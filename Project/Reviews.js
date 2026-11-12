
/* =========================================
   BANANA BLISS - CUSTOMER REVIEWS
   ========================================= */

// Get Saved Reviews
function getReviews() {
   try {
      let reviews = JSON.parse(localStorage.getItem("bananaBlissReviews")) || [];
      return Array.isArray(reviews) ? reviews : [];
   } catch (error) {
      return [];
   }
}

// Save Reviews
function saveReviews(reviews) {
   try {
      localStorage.setItem("bananaBlissReviews", JSON.stringify(reviews));
      return true;
   } catch (error) {
      alert("Unable to save your review.");
      return false;
   }
}

/* =========================================
   DISPLAY CUSTOMER REVIEWS
   ========================================= */

function displayReviews() {
   
   let reviews = getReviews();
   let reviewList = document.getElementById("reviewList");
   reviewList.innerHTML = "";

// Display Message When No Reviews
   if (reviews.length === 0) {
      let emptyMessage = document.createElement("p");
      emptyMessage.textContent ="No reviews yet. Be the first to leave a review!";
      reviewList.appendChild(emptyMessage);
}

// Display Newest Reviews First
reviews.slice().reverse().forEach(function(review) {

// Review Card
   let card = document.createElement("div");
   card.className = "customer-review-card";

// Customer Name
   let name = document.createElement("h3");
   name.textContent = review.name;

// Star Rating
   let stars = document.createElement("p");
   stars.className = "review-stars";

   stars.textContent =
   "★".repeat(review.rating) +
   "☆".repeat(5 - review.rating);

// Review Date
   let date = document.createElement("p");
   date.className = "review-date";
   date.textContent = review.date;

// Customer Feedback
   let message = document.createElement("p");
   message.className = "review-text";
   message.textContent = review.message;

// Add Information to Review Card
   card.appendChild(name);
   card.appendChild(stars);
   card.appendChild(date);
   card.appendChild(message);

// Add Review Card to Webpage
   reviewList.appendChild(card);

});

// Update Average Rating
updateAverageRating(reviews);

}

/* =========================================
   CALCULATE AVERAGE RATING
   ========================================= */

function updateAverageRating(reviews) {
   let averageRating = document.getElementById("averageRating");
   let averageStars = document.getElementById("averageStars");
   let totalReviews = document.getElementById("totalReviews");

// When There Are No Reviews
if (reviews.length === 0) {
   averageRating.textContent = "0.0 / 5";
   averageStars.textContent = "☆☆☆☆☆";
   totalReviews.textContent = "No reviews yet";
   return;
}

// Calculate Total Stars
let totalStars = 0;

reviews.forEach(function(review) {
   totalStars += Number(review.rating);
});

// Calculate Average
let average = totalStars / reviews.length;

// Display Average Rating
averageRating.textContent = average.toFixed(1) + " / 5";

// Display Average Stars
let roundedRating = Math.round(average);

averageStars.textContent =
"★".repeat(roundedRating) +
"☆".repeat(5 - roundedRating);

// Display Total Reviews
totalReviews.textContent =
"Based on " + reviews.length + " customer review(s)";

}

/* =========================================
   SUBMIT CUSTOMER REVIEW
   ========================================= */

function submitReview(event) {
   event.preventDefault();

// Get Customer Input
   let name = document.getElementById("reviewName").value.trim();

   let rating = Number(document.getElementById("rating").value);

   let message = document.getElementById("reviewMessage").value.trim();

   let reviewStatus = document.getElementById("reviewStatus");

// Validate Customer Name
if (name.length < 2 || name.length > 50) {
   alert("Please enter a name between 2 and 50 characters.");
   return;
}

// Validate Star Rating
if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
   alert("Please select a rating between 1 and 5 stars.");
   return;
}

// Validate Review Message
if (message.length < 10 || message.length > 500) {
   alert("Your feedback must contain between 10 and 500 characters.");
   return;
}

// Get Current Date
let currentDate = new Date().toLocaleDateString("en-MY");

// Create New Review
let newReview = {
   name: name,
   rating: rating,
   message: message,
   date: currentDate
};

// Get Existing Reviews
let reviews = getReviews();

// Add New Review
reviews.push(newReview);

// Save Review
if (!saveReviews(reviews)) {
   return;
}

// Reset Form
document.getElementById("reviewForm").reset();

// Display Confirmation Message
reviewStatus.textContent =
"Thank you, " + name + "! Your review has been submitted successfully.";
reviewStatus.style.color = "#287A3E";

// Update Reviews Immediately
displayReviews();

// Scroll to Customer Reviews Section
document.getElementById("reviewsSection").scrollIntoView({
   behavior: "smooth",
   block: "start"
});

}

/* =========================================
   LOAD CUSTOMER REVIEWS PAGE
   ========================================= */

document.addEventListener("DOMContentLoaded", function() {

// Display Saved Reviews
   displayReviews();

// Review Form
   let reviewForm = document.getElementById("reviewForm");

// Submit Review
   reviewForm.addEventListener("submit", submitReview);

// Reset Button
   reviewForm.addEventListener("reset", function() {

   document.getElementById("reviewStatus").textContent = "";

});

});