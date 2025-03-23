// Simulated admin credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// DOM Elements
const loginSection = document.getElementById("loginSection");
const loginForm = document.getElementById("loginForm");
const adminSection = document.getElementById("adminSection");
const errorDiv = document.getElementById("error");

// Debugging: Check if elements are correctly selected
console.log("Login Section:", loginSection);
console.log("Login Form:", loginForm);
console.log("Admin Section:", adminSection);
console.log("Error Div:", errorDiv);

// Login Form Submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission
  console.log("Form submitted"); // Debugging

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log("Username:", username, "Password:", password); // Debugging

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    console.log("Login successful"); // Debugging
    loginSection.classList.add("hidden");
    adminSection.classList.remove("hidden");

    // Expand the container
    const container = document.querySelector(".container");
    container.classList.add("expanded");
  } else {
    console.log("Invalid credentials"); // Debugging
    showError("Invalid username or password");
  }
});

// Helper Function to Show Errors
function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
  setTimeout(() => errorDiv.classList.add("hidden"), 3000); // Hide after 3 seconds
}
