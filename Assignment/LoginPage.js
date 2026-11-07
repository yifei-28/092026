function validateForm() {

// Validate Username - cannot be empty
    let username = document.getElementById("username").value.trim();

    if (username == "") {
        alert("Please enter your username!");
        return false;
    }

// Validate Username - minimum 3 characters
    if (username.length < 3) {
        alert("Username must contain at least 3 characters!");
        return false;
    }

// Validate Username - maximum 30 characters
    if (username.length > 30) {
        alert("Username cannot exceed 30 characters!");
        return false;
    }

// Validate Password - cannot be empty
    let password = document.getElementById("password").value;

    if (password == "") {
        alert("Please enter your password!");
        return false;
    }

// Validate Password - minimum 8 characters
    if (password.length < 8) {
        alert("Password must contain at least 8 characters!");
        return false;
    }

// Validate Password - uppercase, lowercase and numeric
    if (!/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password)) {

        alert("Password must contain at least one uppercase letter, one lowercase letter, and one number!");
        return false;
    }

// Remember Username
    let rememberMe = document.getElementById("rememberMe");

    if (rememberMe.checked) {
        localStorage.setItem("username", username);
    } else {
        localStorage.removeItem("username");
    }

// Display successful login popup message
    alert("Login form submitted successfully!");

    return false;
}

// Show / Hide Password Function
function togglePasswordVisibility() {

    let password = document.getElementById("password");
    let eyeIcon = document.getElementById("eyeIcon");
    let toggleButton = document.getElementById("togglePassword");

    if (password.type === "password") {

        // Show password as text
        password.type = "text";

        // Change to eye-off icon
        eyeIcon.innerHTML = `
        <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.8 10.8 0 0 1-1.444 2.49"/>
        <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>
        <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/>
        <path d="m2 2 20 20"/>
        `;

        toggleButton.setAttribute("aria-label", "Hide password");

    } else {

        // Hide password as dots
        password.type = "password";

        // Change to eye-open icon
        eyeIcon.innerHTML = `
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
        <circle cx="12" cy="12" r="3"/>
        `;

        toggleButton.setAttribute("aria-label", "Show password");
    }
}

// Forgot Password Function
function forgotPassword() {

    // Display a popup message
    alert("A password reset link will be sent to your registered email address.");

}


// Load Saved Username
window.onload = function() {

// Get the saved username from local storage
    let savedUsername = localStorage.getItem("username");

// Automatically fill in the saved username
    if (savedUsername) {
        document.getElementById("username").value = savedUsername;

 // Automatically check Remember Username
        document.getElementById("rememberMe").checked = true;
    }
};
